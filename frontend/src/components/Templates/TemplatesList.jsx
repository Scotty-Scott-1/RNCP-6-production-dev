import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TemplatesList.module.css";

const TemplatesList = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleClick = (section) => {
    switch (section) {
      case "1": navigate("/appraisal"); break;
      case "2": navigate("/claim"); break;
      case "3": navigate("/payroll"); break;
      case "4": navigate("/reset"); break;
      default: break;
    }
  };

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00fff7";
      ctx.font = `${fontSize}px Courier New`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.background}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.container}>
        <button className={styles.button} onClick={() => handleClick("1")}>Appraisal Alert</button>
        <button className={styles.button} onClick={() => handleClick("2")}>Claim Voucher</button>
        <button className={styles.button} onClick={() => handleClick("3")}>Payroll Alert</button>
        <button className={styles.button} onClick={() => handleClick("4")}>Reset Password</button>
      </div>
    </div>
  );
};

export default TemplatesList;
