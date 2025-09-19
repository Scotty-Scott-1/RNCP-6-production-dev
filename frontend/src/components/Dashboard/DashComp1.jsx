import React, { useState } from "react";
import styles from "./DashComp1.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/authContext.jsx";

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
			default:
				break
		}
	};

	return (
		<div className={styles.container}>
			<button className={styles.button} name="1" onClick={() => handleClick("1")}>Campaigns</button>
			<button className={styles.button} name="2" onClick={() => handleClick("2")}>User Management</button>
			<button className={styles.button} name="3" onClick={() => handleClick("3")}>Mailing Lists</button>
			<button className={styles.button} name="4" onClick={() => handleClick("4")}>Reports & Analytics</button>
			<button className={styles.button} name="5" onClick={() => handleClick("5")}>Templates</button>
			<button className={styles.button} name="6" onClick={() => handleClick("6")}>Training library</button>
		</div>
	);
};

export default Comp1;
