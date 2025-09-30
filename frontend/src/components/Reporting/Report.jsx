import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../security/authContext.jsx";
import { getOneCampaign } from "./hooks/GetOneCampaign.jsx";
import { getOneMailingList } from "./hooks/GetOneMailingList.jsx";
import { getEmailLogsClicked } from "./hooks/GetEmailLogsClicked.jsx";
import { DateTime } from "luxon";
import styles from "./Report.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Report = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { id, listid } = useParams();
  const myCampaign = getOneCampaign(id, accessToken);
  const myList = getOneMailingList(listid, accessToken);
  const emailLogsClicked = getEmailLogsClicked(id, accessToken);


  const chartData = {
    labels: ["Emails Sent", "Links Clicked", "Credentials Submitted", "Emails Failed"],
    datasets: [
      {
        label: "Campaign Stats",
        data: [
          myCampaign?.emailsSent || 0,
          myCampaign?.linksClicked || 0,
          myCampaign?.credentialsSumbitted || 0,
          myCampaign?.emailsFailed || 0
        ],
        backgroundColor: ["#00fff7", "#00fff7", "#00fff7", "#00fff7"]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Campaign Engagement Overview" }
    },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
  }


  return (

    <div className={styles.reportContainer}>
<button className={styles.backButton} onClick={() => navigate("/report")}>Back to Reports</button>
      <h1 className={styles.title}>Campaign Report</h1>

      <div className={styles.section}>
        <h2>Campaign Details</h2>
        <p><strong>Name:</strong> {myCampaign?.campaignName}</p>
        <p><strong>Description:</strong> {myCampaign?.description}</p>
        <p><strong>Template:</strong> {myCampaign?.template}</p>
        <p><strong>Status:</strong> {myCampaign?.status}</p>
        <p>
          <strong>Start:</strong>{" "}
          {DateTime.fromISO(myCampaign?.startTime).toLocaleString(DateTime.DATETIME_SHORT)}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {DateTime.fromISO(myCampaign?.endTime).toLocaleString(DateTime.DATETIME_SHORT)}
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

      <div className={styles.section}>
        <h2>Visual Report</h2>
        <Bar
          data={chartData}
          options={chartOptions}
          redraw
        />
      </div>

      <div className={styles.section}>
  <h2>Clicked Emails</h2>
  {emailLogsClicked && emailLogsClicked.length > 0 ? (
    <ul>
      {emailLogsClicked.map((log) => (
        <li key={log._id}>
          {log.contactName || "Unknown"}  Clicked: {log.clicked ? "yes" : "no"} -- Credentials Sumbitted: {log.credentialsSubmitted ? "yes" : "no"}
        </li>
      ))}
    </ul>
  ) : (
    <p>No clicked emails yet.</p>
  )}
</div>


    </div>
  );
};

export default Report;
