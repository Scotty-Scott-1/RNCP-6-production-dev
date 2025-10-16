import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Welcome.module.css";
import Navbar from "../Header/Nav/nav.jsx";

const Welcome = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const goToLogin = () => {
    navigate("/signin");
  };



  return (
    <div className={styles.outerContainer}>
      <Navbar />
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.container}>
        <h1 className={styles.title}>Phishing Simulator</h1>
        <button type="button" onClick={goToLogin} className={styles.button}>
          Sign in
        </button>
        <Link to="/signup" className={`${styles.text} ${styles.link}`}>
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
