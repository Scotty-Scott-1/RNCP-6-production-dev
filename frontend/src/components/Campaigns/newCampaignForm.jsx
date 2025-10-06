import React, { useState, useEffect } from 'react';
import styles from './newCampaign.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";
import { useGetMailingLists } from "../Hooks/useGetMailingLists.jsx";

const NewCampaignComponent = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  // State variables
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [mailingListId, setMailingListId] = useState("");
  const [template, setTemplate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [myLists, setMyLists] = useState([]);
  const { loading, error } = useGetMailingLists(accessToken, setMyLists);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!campaignName || !description || !startTime || !endTime || !mailingListId) {
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
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          mailingListId: mailingListId,
          template,
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
              placeholder="Description"
              id="desc"
              rows={4}
            />
          </div>
        </div>


        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="startTime"><p>Start Time</p></label>
          </div>
          <div className={styles.inputColumn}>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="endTime"><p>End Time</p></label>
          </div>
          <div className={styles.inputColumn}>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={styles.input}
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
              {myLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.listName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelColumn}>
            <label htmlFor="temp"><p>Landing Page Template</p></label>
          </div>
          <div className={styles.inputColumn}>
            <select
              id="temp"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className={styles.input}
            >
              <option value="">-- Select a template --</option>
              <option value="voucher">Voucher Claim</option>
              <option value="appraisal">Appraisal Alert</option>
              <option value="payroll">Payroll Confirmation</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles.button2}>Submit</button>
      </form>
    </div>
  );
};

export default NewCampaignComponent;
