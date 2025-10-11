import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MFAInput.module.css";
import { useAuth } from '../../security/authContext';

const MFAInput = () => {

  const [mfaInput, setMfaInput] = useState("");
  const { setAccessToken } = useAuth();
  const { tempMfaToken } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/mfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempMfaToken}`
        },
        body: JSON.stringify({ mfaInput }),
      });

      const data = await res.json();

      if (data.message ==="MFA verified successfully!" && data.accessToken) {
        alert(data.message);
        setAccessToken(data.accessToken);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid code. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Two-Factor Authentication</h2>
        <p className={styles.subtitle}>
          Enter the 6-digit code from your authenticator app.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            className={styles.input}
            placeholder="Enter 6-digit code"
            value={ mfaInput }
            onChange={(e) => setMfaInput(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Verify
          </button>
        </form>

      </div>
    </div>
  );
};

export default MFAInput;
