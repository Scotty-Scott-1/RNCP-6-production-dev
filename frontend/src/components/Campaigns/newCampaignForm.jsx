import React, { useState, useEffect } from 'react';
import styles from './newCampaign.module.css';
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
        const response = await fetch("/api/mailinglist/get", {
          headers: {"Authorization": `Bearer ${accessToken}`}
        });
        if (response.ok) {
          const data = await response.json();
          setMailingLists(data);
        } else console.error("Failed to fetch mailing lists");
      } catch (error) {
        console.error("Error fetching mailing lists:", error);
      }
    };

    if (accessToken) fetchMailingLists();
  }, [accessToken]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!campaignName || !description || !startTime || !endTime || !mailingListId || !emailSenderName) {
      alert("Please fill in all fields and agree to the terms.");
      return;
    }
    try {
      const response = await fetch("/api/campaign/new", {
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
          mailingList: mailingListId,
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
    <div className={styles.outerContainer}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>New Campaign</h1>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="name"><p>Campaign Name</p></label>
          </div>
          <div className={styles.inputColumn}>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className={styles.input}
              placeholder="Campaign Name"
              id="name"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="desc"><p>Description</p></label>
          </div>
          <div className={styles.inputColumn}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
              placeholder="Description"
              id="desc"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="startTime"><p>Start Time</p></label>
          </div>
          <div className={styles.inputColumn}>
            <DateTimePicker
              id="startTime"
              value={startTime}
              onChange={setStartTime}
              className={styles.inputDatetime}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="endTime"><p>End Time</p></label>
          </div>
          <div className={styles.inputColumn}>
            <DateTimePicker
              id="endTime"
              value={endTime}
              onChange={setEndTime}
              className={styles.inputDatetime}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="mail"><p>Mailing List</p></label>
          </div>
          <div className={styles.inputColumn}>
            <select
              value={mailingListId}
              onChange={(e) => setMailingListId(e.target.value)}
              className={styles.input}
              id="mailing"
            >
              <option value="">Select Mailing List</option>
              {mailingLists.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.listName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="emailsender"><p>Email Sender Name</p></label>
          </div>
          <div className={styles.inputColumn}>
            <input
              type="text"
              value={emailSenderName}
              onChange={(e) => setEmailSenderName(e.target.value)}
              className={styles.input}
              placeholder="Email Sender Name"
              id='emailsender'
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="emailtemp"><p>Email Template</p></label>
          </div>
          <div className={styles.inputColumn}>
            <input
              type="text"
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              className={styles.input}
              placeholder="Email Template"
              id="emailtemp"
            />
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={landingPage}
            onChange={(e) => {
              const checked = e.target.checked;
              setLandingPage(checked);
              if (!checked) setLandingPageTemplate("");
            }}
          />
          <span>Create a landing page for this campaign</span>
        </div>

        {landingPage && (
          <div className={styles.row}>
            <div className={styles.labelColumn}>
              <label htmlFor="temp"><p>Landing Page Template</p></label>
            </div>
            <div className={styles.inputColumn}>
              <select
                id="temp"
                value={landingPageTemplate}
                onChange={(e) => setLandingPageTemplate(e.target.value)}
                className={styles.input}
              >
                <option value="">-- Select a template --</option>
                <option value="voucher">Voucher Claim</option>
                <option value="appraisal">Appraisal Alert</option>
                <option value="payroll">Payroll Confirmation</option>
                <option value="hrNotice">HR Notice</option>
              </select>
            </div>
          </div>
        )}

        <button type="submit" className={styles.button2}>Submit</button>
      </form>
    </div>
  );
};

export default NewCampaignComponent;
