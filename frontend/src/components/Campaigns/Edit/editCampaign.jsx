import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../security/authContext.jsx";
import styles from './editCampaign.module.css';
import { useGetOneCampaign } from "../../Hooks/useGetOneCampaign.jsx";
import { getOneMailingList } from "../../Hooks/useGetOneMailingList.jsx";
import { DateTime } from "luxon";
const { updateCampaign } = useUpdateCampaign(accessToken);

const EditCampaign = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { id } = useParams();

  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [template, setTemplate] = useState("");
  const [status, setStatus] = useState("");
  const [mailingListId, setMailingListId] = useState("");
  const [listId, setListId] = useState("");

  // load campaign and mailing list objs
  const myCampaign = useGetOneCampaign(id, accessToken);
  const myList = getOneMailingList(mailingListId, accessToken);

useEffect(() => {
  if (!myCampaign) return;

  setCampaignName(myCampaign.campaignName || "");
  setDescription(myCampaign.description || "");
  setStartTime(myCampaign.startTime ? DateTime.fromISO(myCampaign.startTime, { zone: "utc" }).toLocal().toLocaleString(DateTime.DATETIME_MED) : "");
  setEndTime(myCampaign.endTime ? DateTime.fromISO(myCampaign.endTime, { zone: "utc" }).toLocal().toLocaleString(DateTime.DATETIME_MED) : "");
  setTemplate(myCampaign.template);
  setStatus(myCampaign.status);
  setMailingListId(myCampaign.mailingListId);
}, [myCampaign]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!campaignName || !description) {
      alert("Campaign name and description are required.");
      return;
    }
    const success = await updateCampaign(id, campaignName, description);
    if (success) navigate("/campaigns");
  };

  const handleLaunch = async (e) => {
    e.preventDefault();
    if (!campaignName || !description) {
      alert("Campaign name and description are required.");
      return;
    }
    if (status === "launched") {
      alert("Campaign already launched");
      return;
    }
    try {
      const response = await fetch(`/api/campaign/launch`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          listid,
          template,
         }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Launch failed:", errorData);
        alert("Failed to launch campaign");
        return;
      }
      alert("Campaign launched successfully!");
    } catch (err) {
      console.error("Error launching campaign:", err);
      alert("Something went wrong launching the campaign.");
    }
  }

  return (
    <div className={styles.outerContainer}>
<form className={styles.container} onSubmit={handleSubmit}>
  <h1 className={styles.title}>Edit Campaign</h1>

  <div className={styles.formRow}>
    <label className={styles.label}>Campaign Name:</label>
    <input
      type="text"
      value={campaignName}
      onChange={(e) => setCampaignName(e.target.value)}
      className={styles.input}
      required
    />
  </div>

  <div className={styles.formRow}>
    <label className={styles.label}>Description:</label>
    <textarea
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className={styles.input}
      required
      rows={4}
    />
  </div>

  <div className={styles.formRow}>
    <label className={styles.label}>Start Time:</label>
    <p className={styles.readonly}>{startTime}</p>
  </div>

  <div className={styles.formRow}>
    <label className={styles.label}>End Time:</label>
    <p className={styles.readonly}>{endTime}</p>
  </div>

  <div className={styles.formRow}>
    <label className={styles.label}>Mailing List:</label>
    <p className={styles.readonly}>{myList?.listName || ""}</p>
  </div>

  <div className={styles.formRow}>
    <label className={styles.label}>Landing Page Template:</label>
    <p className={styles.readonly}>{template}</p>
  </div>
  <div className={styles.formRow}>
    <label className={styles.label}>Status:</label>
    <p className={styles.readonly}>{status}</p>
  </div>
  <div className={styles.formRow}>
    <div></div> {/* empty cell for alignment */}
    <button type="submit" className={styles.button2}>Save Changes</button>
  </div>
<button type="button" onClick={handleLaunch} className={styles.launch}>LAUNCH CAMPAIGN</button>
</form>
    </div>
  );
};

export default EditCampaign;
