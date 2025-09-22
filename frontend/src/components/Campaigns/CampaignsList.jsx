import React, { useState, useEffect } from "react";
import styles from "./CampaignsList.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";
import { FaTrash } from 'react-icons/fa';
import { DateTime } from "luxon";

const Campaigns = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = myCampaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(myCampaigns.length / itemsPerPage);

  const handleCampaignClick = (id, listid) => {
    navigate(`/campaign/edit/${id}/${listid}`);
  };

  const handleAddCampaign = () => navigate("/campaign/new");

  const handleDeleteCampaign = async (id) => {
    console.log("Delete campaign:", id);
    const confirmed = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/campaign/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      });
      if (response.ok) {
        alert("Campaign deleted successfully!");
        setMyCampaigns((prev) => prev.filter(c => c._id !== id));
      } else {
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Campaigns</h1>
          <button className={styles.button2} onClick={handleAddCampaign}>
            + Add Campaign
          </button>
        </div>

        <div className={styles.listHeader}>
          <span>Name</span>
          <span>Date Created</span>
          <span>End Time</span>
          <span>Mailing List</span>
          <span>Actions</span>
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
                <p>
                  {DateTime.fromISO(c.startTime, { zone: "utc" })
                    .toLocal()
                    .toFormat("yyyy-LL-dd HH:mm")}
                </p>
              </span>
              <span>
                <p>
                  {DateTime.fromISO(c.endTime, { zone: "utc" })
                    .toLocal()
                    .toFormat("yyyy-LL-dd HH:mm")}
                </p>
              </span>
              <span>
                <p>{c.mailingList?.listName || "No mailing list"}</p>
              </span>
              <button
                className={styles.trashcan}
                onClick={() => handleDeleteCampaign(c._id)}
              >
                <FaTrash />
              </button>
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

export default Campaigns;
