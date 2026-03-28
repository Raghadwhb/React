import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

export default function ProfilePage({ currentUser, users, onDelete }) {

  const { email } = useParams();

  if (!currentUser) return <Navigate to="/" />;

  const user = users.find(u => u.email === email);

  return (
    <div className="profile-card">

      <Link className="back-btn" to="/members">Back</Link>

      <h1 className="welcome-title">
        Welcome {currentUser.name}
      </h1>

      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Job:</strong> {user.job}</p>
      </div>

      {currentUser.email === email && (
        <button onClick={() => onDelete(email)}>
          Delete Profile
        </button>
      )}

    </div>
  );
}