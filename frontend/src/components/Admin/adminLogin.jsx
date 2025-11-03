import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Header/Nav/nav.jsx';

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in both fields");
      return;
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default AdminSignIn;

