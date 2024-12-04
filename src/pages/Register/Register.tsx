import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          alert('Registration successful! Please log in.');
          navigate('/login');
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.detail || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
