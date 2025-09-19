import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header.jsx';
import styles from '../components/Signup/Signup.module.css';

const Test = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    companyName: '',
    companyAddress: '',
    companyWebsite: '',
    agree: false,
  });

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const newUser = await res.json();
    setUsers(prev => [...prev, newUser]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      companyName: '',
      companyAddress: '',
      companyWebsite: '',
      agree: false,
    });
  };

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.title}>Users List</h2>
      <ul className={styles.userList}>
        {users.map(user => (
          <li key={user._id} className={styles.userItem}>
            name: {user.firstName} <br />
            last name: {user.lastName} <br />
            email: {user.email} <br />
            uername: {user.username} <br />
            company name: {user.companyName} <br />
            companyAddress: {user.companyAddress} <br />
            companyWebsite: {user.companyWebsite} <br />
            agree: {user.agree ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className={styles.input} />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className={styles.input} />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className={styles.input} />
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className={styles.input} />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className={styles.input} />
        <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className={styles.input} />
        <input name="companyAddress" value={formData.companyAddress} onChange={handleChange} placeholder="Company Address" className={styles.input} />
        <input name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="Company Website" className={styles.input} />
        <label className={styles.checkbox}>
          <input name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} />
          I agree to the terms
        </label>
        <button type="submit" className={styles.button}>Add User</button>
      </form>
    </div>
  );
};

export default Test;
