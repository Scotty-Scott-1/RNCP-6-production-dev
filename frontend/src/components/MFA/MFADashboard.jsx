import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useAuth } from "../../security/authContext.jsx";
import styles from "./MFADashboard.module.css";
import { data } from "react-router-dom";

const MFADashboard = () => {
  const { accessToken } = useAuth();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [secret, setSecret] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMfaStatus = async () => {
      try {
        const res = await fetch("/api/mfa/status", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch MFA status");
        const data = await res.json();
        setMfaEnabled(data.mfaEnabled);
      } catch (err) {
        console.error(err);
        setMessage("Could not fetch MFA status.");
      }
    };

    fetchMfaStatus();
  }, [accessToken]);

  const handleEnableMFA = async () => {
    try {
      const res = await fetch("/api/mfa/setup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to setup MFA");

      const data = await res.json();
      setSecret(data.secret);
      setQrCode(data.qrCode);
      setMessage(
        "Scan the QR code with your authenticator app and enter the 6-digit code below."
      );
    } catch (err) {
      console.error(err);
      setMessage("Failed to setup MFA.");
    }
  };

  const handleVerifyMFA = async () => {
    try {
      const res = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log(data.message);

      if (res.ok) {
        setMfaEnabled(true);
        setMessage("MFA enabled successfully!");
        setSecret("");
        setQrCode("");
        setToken("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDisableMFA = async () => {
    try {
      const res = await fetch("/api/mfa/disable", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMfaEnabled(false);
        setMessage("MFA disabled.");
      } else {
        setMessage(data.message || "Failed to disable MFA.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to disable MFA.");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Multi-Factor Authentication</h2>
        {message && (
          <p className={`${styles.status} ${styles.active}`}>{message}</p>
        )}

        {!mfaEnabled ? (
          <>
            <button className={styles.button2} onClick={handleEnableMFA}>
              Enable MFA
            </button>

{qrCode && (
  <div className={styles.qrcode}>
    <QRCode value={qrCode} size={200} />
    <input
      className="input"
      placeholder="Enter 6-digit code"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      style={{ marginTop: "0.5rem" }}
    />
    <button className={styles.button2} onClick={handleVerifyMFA} style={{ marginTop: "0.5rem" }}>
      Verify MFA
    </button>
  </div>
)}

          </>
        ) : (
          <button className={styles.trashcan} onClick={handleDisableMFA}>
            Disable MFA
          </button>
        )}
      </div>
    </div>
  );
};

export default MFADashboard;
