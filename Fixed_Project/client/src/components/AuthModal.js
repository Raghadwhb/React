import { useState } from "react";
import axios from "axios";
import BootstrapModal from "./BootstrapModal";
import API from "../config/api";

function AuthModal({ mode: initialMode, onClose, onLogin, onSwitchMode }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", newPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const reset = () => { setError(""); setSuccess(""); setForm({ name: "", email: "", password: "", newPassword: "" }); };

  const switchTo = (newMode) => {
    reset();
    setMode(newMode);
    if (newMode !== "forgot") onSwitchMode?.();
  };

  const submit = async () => {
    setError(""); setSuccess("");
    const email = form.email.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (mode === "forgot") {
      const newPassword = form.newPassword;
      if (!email) return setError("Email is required.");
      if (!emailOk) return setError("Please enter a valid email address.");
      if (!newPassword || newPassword.length < 4) return setError("New password must be at least 4 characters.");
      setLoading(true);
      try {
        const res = await axios.post(API + "/api/auth/reset-password", { email, newPassword });
        setSuccess(res.data.message || "Password reset successfully.");
      } catch (err) {
        setError(err.response?.data?.message || "Could not reset password.");
      } finally { setLoading(false); }
      return;
    }

    const password = form.password;
    const name = form.name.trim();
    if (!email || !password || (mode === "register" && !name))
      return setError(mode === "login" ? "Email and password are required" : "Name, email and password are required");
    if (!emailOk) return setError("Please enter a valid email address.");
    if (password.length < 4) return setError("Password must be at least 4 characters.");
    if (mode === "register" && name.length < 2) return setError("Name must be at least 2 characters.");

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload  = mode === "login" ? { email, password } : { name, email, password };
      const res = await axios.post(API + endpoint, payload);
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to connect to server");
    } finally { setLoading(false); }
  };

  const titles = { login: "Welcome Back", register: "Create Account", forgot: "Reset Password" };

  const footer = (
    <div className="w-100 d-flex justify-content-between align-items-center">
      {mode === "forgot" ? (
        <><small className="text-muted">Remember your password?</small>
          <button className="btn btn-link p-0" onClick={() => switchTo("login")}>Back to Log In</button></>
      ) : (
        <><small className="text-muted">{mode === "login" ? "Don't have an account?" : "Already have an account?"}</small>
          <button className="btn btn-link p-0" onClick={() => switchTo(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Register" : "Log In"}
          </button></>
      )}
    </div>
  );

  return (
    <BootstrapModal show={true} onClose={onClose} title={titles[mode]} maxWidth={520} footer={footer}>
      <p className="text-muted mb-3">
        {mode === "login"    && "Sign in to your account"}
        {mode === "register" && "Join KamerZoeker"}
        {mode === "forgot"   && "Enter your email and choose a new password."}
      </p>

      {error   && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      {mode === "register" && (
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" placeholder="Your name" value={form.name} onChange={handle} />
        </div>
      )}

      <div className="form-group">
        <label>Email</label>
        <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} />
      </div>

      {mode !== "forgot" && (
        <div className="form-group">
          <label>Password</label>
          <input
            name="password" type="password" placeholder="Min 4 characters"
            value={form.password} onChange={handle}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          {mode === "login" && (
            <div style={{ textAlign: "right", marginTop: 4 }}>
              <button onClick={() => switchTo("forgot")}
                style={{ background: "none", border: "none", color: "#1565C0", cursor: "pointer", fontSize: 13, padding: 0 }}>
                Forgot password?
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "forgot" && (
        <div className="form-group">
          <label>New Password</label>
          <input
            name="newPassword" type="password" placeholder="Min 4 characters"
            value={form.newPassword} onChange={handle}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>
      )}

      <button className="btn btn-green btn-full btn-lg" onClick={submit}
        disabled={loading || Boolean(success)} style={{ marginTop: 8 }}>
        {loading ? "Please wait..."
          : mode === "login"    ? "Log In"
          : mode === "register" ? "Create Account"
          : "Reset Password"}
      </button>
    </BootstrapModal>
  );
}

export default AuthModal;
