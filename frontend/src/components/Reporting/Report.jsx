import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../security/authContext.jsx";
import { getOneCampaign } from "./hooks/GetOneCampaign.jsx";
import { getOneMailingList } from "./hooks/GetOneMailingList.jsx";
import { DateTime } from "luxon";
import styles from "./Report.module.css"

const Report = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { id, listid } = useParams();

  const myCampaign = getOneCampaign(id, accessToken);
  const myList = getOneMailingList(listid, accessToken);

return (

<div className={styles.reportContainer}>
  <h1 className={styles.title}>Campaign Report</h1>

  <div className={styles.section}>
    <h2>Campaign Details</h2>
    <p><strong>Name:</strong> {myCampaign?.campaignName}</p>
    <p><strong>Description:</strong> {myCampaign?.description}</p>
    <p><strong>Template:</strong> {myCampaign?.template}</p>
    <p><strong>Status:</strong> {myCampaign?.status}</p>
    <p>
      <strong>Start:</strong> {DateTime.fromISO(myCampaign?.startTime).toLocaleString(DateTime.DATETIME_SHORT)}
    </p>
    <p>
      <strong>End:</strong> {DateTime.fromISO(myCampaign?.endTime).toLocaleString(DateTime.DATETIME_SHORT)}
    </p>
  </div>

  <div className={styles.section}>
    <h2>Email Stats</h2>
    <p><strong>Total Emails Sent:</strong> {myCampaign?.emailsSent}</p>
    <p><strong>Total Emails Failed:</strong> {myCampaign?.emailsFailed}</p>
  </div>

  <div className={styles.section}>
    <h2>Mailing List</h2>
    <p><strong>List Name:</strong> {myList?.listName}</p>
    <p><strong>Total Contacts:</strong> {myList?.contacts?.length}</p>
  </div>

  <div className={styles.section}>
    <h2>Engagement</h2>
    <p><strong>Links Clicked:</strong> {myCampaign?.linksClicked}</p>
    <p><strong>Credentials Submitted:</strong> {myCampaign?.credentialsSumbitted}</p>
  </div>

  <button className={styles.backButton} onClick={() => navigate("/report")}>
    Back to Reports
  </button>
</div>



  );
}

export default Report;
