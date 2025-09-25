import React, { useState, useEffect } from "react";
import styles from "./ReportList.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";
import { FaTrash } from 'react-icons/fa';
import { DateTime } from "luxon";

const Reports = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [myCampaigns, setMyCampaigns] = useState([]);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const response = await fetch("/api/campaign/get", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMyCampaigns(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken) getCampaigns();
  }, [accessToken]);

  const launchedCampaigns = myCampaigns.filter(c => c.status?.toLowerCase() === "launched");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = launchedCampaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(launchedCampaigns.length / itemsPerPage);

  const handleCampaignClick = (id, listid) => {
    navigate(`/report/${id}/${listid}`);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Launched Campaigns</h1>
        </div>

        <div className={styles.listHeader}>
          <span>Name</span>
          <span>Date Created</span>
          <span>End Time</span>
          <span>Mailing List</span>
          <span>Actions</span>
          <span>Status</span>
        </div>

        <div className={styles.list}>
          {currentItems.map((c) => (
            <div key={c._id} className={styles.listItem}>
              <button
                className={styles.campaignButton}
                onClick={() => handleCampaignClick(c._id, c.mailingList?._id)}
              >
                {c.campaignName}
              </button>
              <span>
                {DateTime.fromISO(c.startTime, { zone: "utc" })
                  .toLocal()
                  .toFormat("yyyy-LL-dd HH:mm")}
              </span>
              <span>
                {DateTime.fromISO(c.endTime, { zone: "utc" })
                  .toLocal()
                  .toFormat("yyyy-LL-dd HH:mm")}
              </span>
              <span>{c.mailingList?.listName || "No mailing list"}</span>
              <span>
                <button
                  className={styles.trashcan}
                  onClick={() => handleDeleteCampaign(c._id)}
                >
                  <FaTrash />
                </button>
              </span>
              <span className={`${styles.status} ${styles[c.status?.toLowerCase()]}`}>
                {c.status || "Pending"}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
