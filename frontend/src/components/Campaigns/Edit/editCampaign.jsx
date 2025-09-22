import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../security/authContext.jsx";
import styles from './editCampaign.module.css';
import { getOneCampaign } from "./hooks/GetOneCampaign.jsx";
import { getOneMailingList } from "./hooks/GetOneMailingList.jsx";
import DateTimePicker from '../../DateInput/DateInputComponent.jsx';

const EditCampaign = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { id, listid } = useParams();

  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [mailingList, setMailingList] = useState("");
  const [emailSenderName, setEmailSenderName] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [landingPageTemplate, setLandingPageTemplate] = useState("");
  const [landingPage, setLandingPage] = useState(false);


  // load campaign
  const myCampaign = getOneCampaign(id, accessToken);
  const myList = getOneMailingList(listid, accessToken);

  // load campaign data
  useEffect(() => {
    if (myCampaign) {
      setCampaignName(myCampaign.campaignName || "");
      setDescription(myCampaign.description || "");
      setStartTime(myCampaign.startTime);
      setEndTime(myCampaign.endTime);
      setEmailSenderName(myCampaign.emailSenderName || "");
      setEmailTemplate(myCampaign.emailTemplate || "");
      setLandingPageTemplate(myCampaign.landingPageTemplate || "");
      setLandingPage(myCampaign.landingPage || false);
    }
  }, [myCampaign]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaignName || !description || !startTime || !endTime || !emailSenderName) {
      alert("All required fields must be filled.");
      return;
    }
    try {
      const response = await fetch("/api/campaign/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          campaignName,
          description,
  startTime: new Date(startTime).toISOString(),
  endTime: new Date(endTime).toISOString(),
          emailSenderName,
          emailTemplate,
          landingPageTemplate,
          landingPage,
        }),
      });

      if (response.ok) {
        console.log("Campaign updated");
        navigate("/campaigns");
      } else {
        alert("Failed to update campaign.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong updating the campaign.");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Edit Campaign</h1>
        <label className={styles.label} htmlFor="campaignName">Campaign Name:</label>
        <input
          type="text"
          id="campaignName"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className={styles.input}
          placeholder="Campaign Name"
          required
        />
        <label className={styles.label} htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
          placeholder="Description"
          required
        />
        <label className={styles.label} htmlFor="startTime">Start Time:</label>
        <DateTimePicker
          id="startTime"
          value={startTime}
          onChange={setStartTime}
          className={styles.inputDatetime}
        />
        <label className={styles.label} htmlFor="endTime">End Time:</label>
			  <DateTimePicker
          id="endTime"
          value={endTime}
          onChange={setEndTime}
          className={styles.inputDatetime}
        />
        <label className={styles.label} htmlFor="Mailing list">Mailing List:</label>
        <input
          type="text"
          id="Mailing list"
          value={myList?.listName || ""}
          className={styles.input}
          placeholder="Mailing list"
          readOnly
        />
       <label className={styles.label} htmlFor="emailSenderName">Email Sender Name:</label>
       <input
         type="text"
         id="emailSenderName"
         value={emailSenderName}
         onChange={(e) => setEmailSenderName(e.target.value)}
         className={styles.input}
         placeholder="Email Sender Name"
         required
       />
       <label className={styles.label} htmlFor="emailTemplate">Email Template:</label>
       <input
         type="text"
         id="emailTemplate"
         value={emailTemplate}
         onChange={(e) => setEmailTemplate(e.target.value)}
         className={styles.input}
         placeholder="Email Template"
       />
       <label className={styles.label} htmlFor="LandingPageTemplate">Landing Page Template:</label>
       <input
         type="text"
         id="landingPageTemplate"
         value={landingPageTemplate}
         onChange={(e) => setLandingPageTemplate(e.target.value)}
         className={styles.input}
         placeholder="Landing Page Template"
       />
       <p>
        <input
           type="checkbox"
           checked={landingPage}
           onChange={(e) => setLandingPage(e.target.checked)}
           id="ch"
        />
          Create a landing page for this campaign
        </p>

        <button type="submit" className={styles.button2}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditCampaign;
