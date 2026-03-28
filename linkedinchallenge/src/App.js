import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import MembersPage from './Pages/MembersPage';
import ProfilePage from './Pages/ProfilePage';

function App() {

  const navigate = useNavigate();

  const [usersList, setUsersList] = useState(() => {
    const stored = localStorage.getItem('usersList');
    return stored ? JSON.parse(stored) : [];
  });

  const [activeUser, setActiveUser] = useState(() => {
    const stored = localStorage.getItem('activeUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem('usersList', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
  }, [activeUser]);

  const createUser = (data) => {
    const exists = usersList.find(u => u.email === data.email);

    if (exists) {
      alert("Email already exists");
      return;
    }

    setUsersList(prev => [...prev, data]);
  };

 
  const checkUser = (email, password) => {
    const found = usersList.find(
      u => u.email === email && u.password === password
    );

    if (!found) return false;

    setActiveUser(found);
    return true;
  };

 
  const logout = () => {
    setActiveUser(null);
    localStorage.removeItem('activeUser');
    navigate('/');
  };

  
  const deleteAccount = (email) => {
    const ok = window.confirm("Confirm delete?");
    if (!ok) return;

    const updated = usersList.filter(u => u.email !== email);
    setUsersList(updated);
    logout();
  };

  return (
    <div>

      <nav className="navbar">

        <div className="nav-left">
          <img src="/img.ico" alt="logo" className="logo" />
          <Link to="/">LinkedIn</Link>
        </div>

       {activeUser && (
        <button className="logout-btn" onClick={logout}>
         Logout
        </button>
          )}

       </nav>

      <Routes>

        <Route
          path="/"
          element={
            <AuthPage
              setUsers={createUser}
              loginHandler={checkUser}
            />
          }
        />

        <Route
          path="/members"
          element={
            activeUser
              ? <MembersPage users={usersList} currentUser={activeUser} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/profile/:email"
          element={
            activeUser
              ? <ProfilePage users={usersList} currentUser={activeUser} onDelete={deleteAccount} />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </div>
  );
}

export default App;