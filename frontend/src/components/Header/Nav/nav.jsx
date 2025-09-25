// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";

const Navbar = () => {
  return (
	<div>

	<nav className={styles.navbar}>
		<Link to="/dashboard" className={styles.navLink}>Dashboard </Link>
		<Link to="/about" className={styles.navLink}>About</Link>
		<Link to="/campaigns" className={styles.navLink}>Campaigns</Link>
		<Link to="/mailinglists" className={styles.navLink}>Mailing Lists</Link>
		<Link to="/template" className={styles.navLink}>Templates</Link>
		<Link to="/signin" className={styles.navLink}>Sign Out</Link>

	</nav>
	</div>
  );
};

export default Navbar;
