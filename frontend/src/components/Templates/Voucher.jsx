import React from "react";
import styles from "./voucher.module.css";

const ClaimVoucher = () => {
  const handleClaim = (e) => {
    e.preventDefault();
    alert("🎉 Congratulations! Your voucher has been claimed!");
  };

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
