import React, { useState } from 'react';
import styles from './Welcome.module.css';
import { useNavigate, Link } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate();
   const goToLogin = () => {
    navigate('/signin');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phishing Simulator</h1>
	    <button type="button" onClick={goToLogin} className={styles.button}>Sign in</button>
      <Link to="/signup" className={`${styles.text} ${styles.link}`}>
        Don't have an account? Sign up
      </Link>

    </div>
  );
};

export default Welcome;
