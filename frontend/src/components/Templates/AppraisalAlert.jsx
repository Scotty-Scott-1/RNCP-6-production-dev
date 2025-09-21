import React from "react";
import styles from "./AppraisalAlert.module.css";

const AppraisalAlert = () => {
  const handleAcknowledge = (e) => {
    e.preventDefault();
    alert("✅ Response recorded. Please proceed to complete your appraisal.");
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h2>📄 Human Resources Department</h2>
        <p className={styles.tex}>
          HR Office, 3rd Floor <br />
          123 Corporate Avenue <br />
          Business City, BC 45678 <br />
          hr@company.com | +1 (555) 123-4567
        </p>
      </div>

      <div className={styles.container}>
        <h1>⚠️ Appraisal Response Required</h1>
        <p className={styles.warning}>
          Dear Employee,
          <br />
          You are required to respond to the appraisal request before the stated
          deadline. Failure to respond will be considered as{" "}
          <strong>absence/non-compliance</strong> and may impact your record.
        </p>

        <form onSubmit={handleAcknowledge}>
          <label htmlFor="ack">Enter your full name to acknowledge:</label>
          <input
            className={styles.input}
            type="text"
            id="ack"
            placeholder="Your full name"
            required
          />

          <label htmlFor="address">Enter your current home address:</label>
          <textarea
            className={styles.textarea}
            id="address"
            placeholder="Street, City, Postal Code"
            required
          ></textarea>

          <button className={styles.button} type="submit">
            ✅ Acknowledge & Proceed
          </button>
        </form>
        <h6>Please complete this acknowledgment before the deadline.</h6>
        <h6>Training simulation</h6>
      </div>
    </div>
  );
};

export default AppraisalAlert;
