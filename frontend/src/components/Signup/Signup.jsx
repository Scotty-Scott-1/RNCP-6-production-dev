import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
	/*STOP RELOADING: Stop the form from reloading the page*/
	const navigate = useNavigate();
	/*STATE VARIABLES: Create state variables for each input field*/
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyWebsite, setCompanyWebsite] = useState("");
	const [agree, setAgree] = useState(false);
	/*HANDLE FORM SUBMISSION: Handle the form submission event*/
	const handleSubmit = async (e) => {
		/*STOP RELOADING: Stop the form from reloading the page*/
		e.preventDefault();
		/*INPUT VALIDATION: Check if all fields are filled otherwise show an alert and return*/
		if (!username || !password || !email || !firstName || !lastName || !companyName || !companyAddress || !companyWebsite || !agree) {
			alert("Please fill in all fields and agree to the terms.");
			return;
		}
		/*TRY SENDING DATA TO BACKEND: Send the form data to the backend*/
		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					username,
					password,
					companyName,
					companyAddress,
					companyWebsite,
					agree
				}),
			});
			/*HANDLE RESPONSE: Handle the response from the backend*/
			const data = await response.json();
			if (response.ok) {
				alert("Signup successful! Please log in.");
				navigate("/login");
			} else {
				alert(data.message || "Signup failed. Please try again.");
			}
		}
		/*ON FAIL LOG ERROR MESSAGE: Alert the user that signup failed, function does not fail*/
		catch (error) {
			console.error("Error during signup:", error);
			alert("An error occurred. Please try again later.");
		}
	}
	/*RENDER FORM: Render the signup form. On field change, update the corresponding state variable*/
	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				type="text"
				value={firstName} onChange={(e) => setFirstName(e.target.value)}
				className={styles.input}
				placeholder="First Name"
			/>
			<input
				type="text"
				value={lastName} onChange={(e) => setLastName(e.target.value)}
				className={styles.input}
				placeholder="Last Name"
			/>
			<input
				type="email"
				value={email} onChange={(e) => setEmail(e.target.value)}
				className={styles.input}
				placeholder="Email"
			/>
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
			<input
				type="text"
				value={companyName}
				onChange={(e) => setCompanyName(e.target.value)}
				className={styles.input}
				placeholder="Company Name"
			/>
			<input
				type="text"
				value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)}
				className={styles.input}
				placeholder="Company Address"
			/>
			<input
				type="text"
				value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)}
				className={styles.input}
				placeholder="Company Website"
			/>

			<label className={styles.checkboxLabel}>
				<input
					type="checkbox"
					checked={agree} onChange={(e) => setAgree(e.target.checked)}
				/>
				I agree to the terms and conditions
			</label>
			<button type="submit" className={styles.button}>Sign Up</button>
			<p>Already have an account? <Link to="/login">Login</Link></p>
		</form>
	);

}
export default SignUp;
