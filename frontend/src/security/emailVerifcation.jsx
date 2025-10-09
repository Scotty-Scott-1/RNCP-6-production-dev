import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const EmailVerify = () => {
  const [status, setStatus] = useState("Verifying...");
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/Security/email", {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            token: token
          }),
        });
        const data = await res.json();
        if (res.ok) setStatus(data.message);
        else setStatus(data.message || "Verification failed.");
      } catch (err) {
        console.error(err);
        setStatus("Something went wrong.");
      }
    };

    if (token) verifyEmail();
    else setStatus("No token provided.");
  }, [token]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Email Verification</h1>
      <p>{status}</p>
      <p>Sign in<Link to="/signin">Sign in</Link></p>
    </div>
  );
};

export default EmailVerify;
