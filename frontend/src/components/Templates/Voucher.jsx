import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./voucher.module.css";

const ClaimVoucher = () => {

  const handleClaim = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const logid = params.get("logid");
    if (logid) {
      try {
        const res = await fetch(`/api/emaillog/submit/${logid}`, {method: "POST"});
        alert("this is a training simulation")
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const recordClick = async () => {
      const params = new URLSearchParams(window.location.search);
      const logid = params.get("logid");
      if (!logid) return;
      try {
        const res = await fetch(`/api/emaillog/clicked/${logid}`, { method: "POST" });
      } catch (err) {
        console.error(err);
      }
    };
    recordClick();
  }, []);



  return (
    <div className={styles.body}>
      <h1>🎁 Claim Your Festive Voucher 🎁</h1>
      <form className={styles.container} onSubmit={handleClaim}>
        <label htmlFor="email">Enter your email:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="you@example.com"
          required
        />
        <button className={styles.button} type="submit">
          🎉 Claim Now
        </button>
      </form>
      <h6>Limited time offer – don’t miss out!</h6>
	  <h6>Training Simulation</h6>
    </div>
  );
};

export default ClaimVoucher;
