import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './resetPassword.module.css';


const ResetPW = () => {

	return (
		<div className={styles.body}>
			<h1>Reset your password</h1>
			<form className={styles.container}>
				<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						placeholder="Username"
					/>
				<label className={styles.label} htmlFor="oldpw">Previous Password:</label>
					<input
						className={styles.input}
						type="password"
						id="oldpw"
						placeholder="Previous Password"
					/>
				<label className={styles.label} htmlFor="newpw">New Password:</label>
					<input
						className={styles.input}
						type="password"
						id="newpw"
						placeholder="New Password"
					/>

					<button className={styles.button}>

						Update
					</button>

			</form >
			<h6>Training simulation</h6>
		</div>
  );
};

export default ResetPW;
