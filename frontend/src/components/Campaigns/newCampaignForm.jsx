import React, { useState, useEffect } from 'react';
import styles from './Campaign.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";
import DateTimePicker from '../DateInput/DateInputComponent.jsx';

const NewCampaignComponent = () => {
	const navigate = useNavigate();
	const { accessToken } = useAuth();

	// State variables
	const [campaignName, setCampaignName] = useState("");
	const [description, setDescription] = useState("");
	const [mailingListId, setMailingListId] = useState("");
	const [emailSenderName, setEmailSenderName] = useState("");
	const [emailTemplate, setEmailTemplate] = useState("");
	const [landingPageTemplate, setLandingPageTemplate] = useState("");
	const [landingPage, setLandingPage] = useState(false);
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [mailingLists, setMailingLists] = useState([]);

	// Fetch mailing lists
	useEffect(() => {
		const fetchMailingLists = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/mailinglist/get", {
					headers: {
						"Authorization": `Bearer ${accessToken}`
					}
				});
				if (response.ok) {
					const data = await response.json();
					setMailingLists(data); // assuming API returns array of mailing lists
				} else {
					console.error("Failed to fetch mailing lists");
				}
			} catch (error) {
				console.error("Error fetching mailing lists:", error);
			}
		};

		if (accessToken) {
			fetchMailingLists();
		}
	}, [accessToken]);

	// Handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!campaignName || !description ||
			!startTime || !endTime || !mailingListId ||
			!emailSenderName
		) {
			alert("Please fill in all fields and agree to the terms.");
			return;
		}

		try {
			const response = await fetch("https://localhost:3000/api/campaign/new", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					campaignName,
					description,
					startTime: startTime.toISOString(),
					endTime: endTime.toISOString(),
					mailingList: mailingListId, // send mailing list _id
					emailSenderName,
					emailTemplate,
					landingPageTemplate,
					landingPage,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				console.log("Campaign created successfully:", data);
				navigate("/campaigns");
			} else {
				const errorData = await response.json();
				console.error("Error creating campaign:", errorData);
				alert("Failed to create campaign. Please try again.");
			}
		} catch (error) {
			console.error("Error creating campaign:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				type="text"
				value={campaignName}
				onChange={(e) => setCampaignName(e.target.value)}
				className={styles.input}
				placeholder="Campaign Name"
			/>
			<input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className={styles.input}
				placeholder="Description"
			/>

			<label htmlFor="startTime">Start Time:</label>
			<DateTimePicker
				id="startTime"
				value={startTime}
				onChange={setStartTime}
				className={styles.inputDatetime}
			/>

			<label htmlFor="endTime">End Time:</label>
			<DateTimePicker
				id="endTime"
				value={endTime}
				onChange={setEndTime}
				className={styles.inputDatetime}
			/>

			{/* Mailing List Dropdown */}
			<select
				value={mailingListId}
				onChange={(e) => setMailingListId(e.target.value)}
				className={styles.input}
			>
				<option value="">Select Mailing List</option>
				{mailingLists.map((list) => (
					<option key={list._id} value={list._id}>
						{list.listName}
					</option>
				))}
			</select>

			<input
				type="text"
				value={emailSenderName}
				onChange={(e) => setEmailSenderName(e.target.value)}
				className={styles.input}
				placeholder="Email Sender Name"
			/>
			<input
				type="text"
				value={emailTemplate}
				onChange={(e) => setEmailTemplate(e.target.value)}
				className={styles.input}
				placeholder="Email Template"
			/>
			<input
				type="text"
				value={landingPageTemplate}
				onChange={(e) => setLandingPageTemplate(e.target.value)}
				className={styles.input}
				placeholder="Landing Page Template"
			/>

			<label className={styles.checkboxContainer}>
				<input
					type="checkbox"
					checked={landingPage}
					onChange={(e) => setLandingPage(e.target.checked)}
				/>
				Create a landing page for this campaign
			</label>

			<button type="submit" className={styles.button2}>Submit</button>
		</form>
	);
};

export default NewCampaignComponent;
