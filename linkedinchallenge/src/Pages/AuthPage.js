import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage({ setUsers, loginHandler }) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    job: ''
  });

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const registerSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords not match");
      return;
    }

    setUsers(form);
    alert("Account created");
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const ok = loginHandler(login.email, login.password);

    if (ok) navigate('/members');
    else alert("Wrong email or password");
  };

  return (
    <div className="home-container">

      <h1>Welcome to LinkedIn</h1>

      <div className="forms-wrapper">

        <form className="card" onSubmit={registerSubmit}>
          <h3>Register</h3>

          <input onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name"/>
          <input onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Email"/>
          <input type="password" onChange={(e)=>setForm({...form,password:e.target.value})} placeholder="Password"/>
          <input type="password" onChange={(e)=>setForm({...form,confirm:e.target.value})} placeholder="Confirm"/>
          <input onChange={(e)=>setForm({...form,job:e.target.value})} placeholder="Job"/>

          <button>Register</button>
        </form>

        <form className="card" onSubmit={loginSubmit}>
          <h3>Login</h3>

          <input onChange={(e)=>setLogin({...login,email:e.target.value})} placeholder="Email"/>
          <input type="password" onChange={(e)=>setLogin({...login,password:e.target.value})} placeholder="Password"/>

          <button>Login</button>
        </form>

      </div>
    </div>
  );
}