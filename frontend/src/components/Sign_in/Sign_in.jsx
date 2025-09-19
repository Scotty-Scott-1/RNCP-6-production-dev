import React, { useState } from 'react';
import styles from './Sign_in.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../security/authContext';


const Sign_in = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setAccessToken } = useAuth();

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
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ username, password }),
				credentials: "include"
			});

			const data = await res.json();
			/*HANDLE RESPONSE: If login is successful, store the accessToken in context and navigate to dashboard*/
			if (res.ok) {
				console.log("Login successful:", data);
				setAccessToken(data.accessToken);
				setTimeout(() => navigate("/dashboard"), 0);

				localStorage.setItem("user", JSON.stringify({
					id: data.user.id,
					username: data.user.username
				}));

			} else {
				alert("Login failed. Please try again.");
			}
		} catch (err) {
			console.error("Error logging in:", err);
		}
	};


	return (
		<div className={styles.outercontainer}>
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
		<p>Don’t have an account? <Link to="/register">Register</Link></p>
	</form>
	</div>
  );
};

export default Sign_in;
