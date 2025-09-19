// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";

const Navbar = () => {
  return (
	<nav className={styles.navbar}>
		<Link to="/" className={styles.navLink}>Home </Link>
		<Link to="/about" className={styles.navLink}>About</Link>
		<Link to="/campaigns" className={styles.navLink}>Campaigns</Link>
		<Link to="/mailinglists" className={styles.navLink}>Mailing Lists</Link>
		<Link to="/templates" className={styles.navLink}>Templates</Link>
	</nav>
  );
};

export default Navbar;
