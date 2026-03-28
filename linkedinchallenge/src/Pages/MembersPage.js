import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function MembersPage({ currentUser, users }) {

  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="members-container">

      <h1 className="welcome-title">
        Welcome {currentUser.name}
      </h1>

      <div className="members-list">
        {users.map(user => (
          <div className="member-item" key={user.email}>
            <span>{user.name}</span>

            <Link to={`/profile/${user.email}`}>
              View Profile
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}