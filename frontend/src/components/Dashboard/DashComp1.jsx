import React from "react";
import styles from "./DashComp1.module.css";
import { useNavigate } from "react-router-dom";

const Comp1 = () => {
  const navigate = useNavigate();

  const handleClick = (section) => {
    switch (section) {
      case "1":
        navigate("/campaigns");
        break;
      case "2":
        navigate("/about");
        break;
      case "3":
        navigate("/mailinglists");
        break;
      case "5":
        navigate("/template");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.container}>
        <button className={styles.button} onClick={() => handleClick("1")}>Campaigns</button>
        <button className={styles.button} onClick={() => handleClick("2")}>User Management</button>
        <button className={styles.button} onClick={() => handleClick("3")}>Mailing Lists</button>
        <button className={styles.button} onClick={() => handleClick("4")}>Reports & Analytics</button>
        <button className={styles.button} onClick={() => handleClick("5")}>Templates</button>
        <button className={styles.button} onClick={() => handleClick("6")}>Training Library</button>
      </div>
    </div>
  );
};

export default Comp1;
