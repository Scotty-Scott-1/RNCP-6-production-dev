import React, { useState } from 'react';
import styles from './Sign_in.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../security/authContext';
import Navbar from '../Header/Nav/nav.jsx';


const Sign_in = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setAccessToken, setTempMfaToken } = useAuth();

	const handleSubmit = async (e) => {

		/*STOP RELOADING: Stop the form from reloading the page*/
		e.preventDefault();

		/*INPUT VALIDATION: Check if both fields are filled otherwise show an alert and return*/
		if (!username || !password) {
			alert("Please fill in both fields");
			return;
		}


		/*TRY SENDING DATA TO BACKEND:
			Send the username and password to the backend.
			If credentials are valid, auth route responds with a refresh http only cookie(refreshToken) saved in browser
			and accessToken in the response body.
		*/
		try {
			const res = await fetch("/api/user/auth", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ username, password }),
				credentials: "include"
			});

			const data = await res.json();
			/*HANDLE RESPONSE: If login is successful, store the accessToken in context and navigate to dashboard*/
			if (data.message === "Login successful") {
				console.log("Login successful:", data);
				setAccessToken(data.accessToken);
				navigate("/dashboard");
			}
			else if (data.message === "MFA code required") {
				alert(data.message);
				setTempMfaToken(data.tempToken);
				navigate("/mfainput");
			}
			 else {
				alert(data.message);
			}
		} catch (err) {
			console.error("Error logging in:", err);
		}
	};


	return (
		<div className={styles.outerContainer}>
		<Navbar />
		<h1 className={styles.title}>Sign in or create an account</h1>
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				type="text"
				value={username} onChange={(e) => setUsername(e.target.value)}
				className={styles.input}
				placeholder="Username"
				/>
			<input
				type="password"
				value={password} onChange={(e) => setPassword(e.target.value)}
				className={styles.input}
				placeholder="Password"
				/>
		<button type="submit" className={styles.button}> Sign In</button>
		<p className={styles.a}>Don’t have an account? <Link to="/signup">Sign up</Link></p>
	</form>
	</div>
  );
};

export default Sign_in;
