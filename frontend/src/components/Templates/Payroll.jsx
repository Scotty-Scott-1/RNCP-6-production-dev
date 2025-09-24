import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Payroll.module.css";

const PayrollConfirm = () => {

  const handleSubmit = async (e) => {
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
  }

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
      <header className={styles.header}>
        <div className={styles.brand}>
          <h2>Finance & Payroll</h2>
          <p>Payroll Dept. • HQ Building • payroll@company.com • +1 (555) 222-3344</p>
        </div>
        <div className={styles.notice}>Official Notice</div>
      </header>

      <main className={styles.container}>
        <h1>Payroll Update — Confirm Bank Details</h1>

        <p className={styles.lead}>
          To ensure uninterrupted salary deposit, please confirm your bank
          details below. Incorrect or missing information may delay your next payment.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name</label>
          <input id="fullname" className={styles.input} type="text" required placeholder="Jane Doe" />

          <label htmlFor="empid">Employee ID</label>
          <input id="empid" className={styles.input} type="text" required placeholder="EMP-12345" />

          <label htmlFor="bank">Bank Name</label>
          <input id="bank" className={styles.input} type="text" required placeholder="Example Bank" />

          <label htmlFor="acc">Account Number</label>
          <input id="acc" className={styles.input} type="text" required placeholder="12345678" />

          <label htmlFor="sort">Sort Code / Routing</label>
          <input id="sort" className={styles.input} type="text" required placeholder="12-34-56 or 000111222" />

          <div className={styles.small}>
            By submitting you confirm these details are correct. If you have
            questions contact payroll@company.com.
          </div>

          <button className={styles.button} type="submit">Confirm and Submit</button>
        </form>
		<h6>Training simulation</h6>
      </main>

      <footer className={styles.footer}>
        <small>Payroll Dept • Company Name • Confidential</small>
      </footer>
    </div>
  );
};

export default PayrollConfirm;
