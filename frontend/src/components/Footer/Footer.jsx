import React, { useState } from 'react';
import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {


  return (
    <div className={styles.footer}>
		<div>
			<ul>
				<li>About</li>
				<li>Contact</li>
				<li>Privacy Policy</li>
				<li>Terms of Service</li>
				<li>Help</li>
			</ul>
		</div>
    </div>
  );
};

export default Footer;
