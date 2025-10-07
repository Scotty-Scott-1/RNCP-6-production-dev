import React, { useState } from "react";
import styles from "./CampaignsList.module.css";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCheck } from "react-icons/fa";
import { DateTime } from "luxon";
import { useAuth } from "../../security/authContext.jsx";
import { useGetCampaigns } from "../Hooks/useGetCampaigns.jsx";
import { useDeleteCampaign } from "../Hooks/useDeleteCampaign.jsx";
import { useCompleteCampaign } from "../Hooks/useCompleteCampaign.jsx";

const Campaigns = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const { accessToken } = useAuth();
  const [campaigns, setCampaigns] = useState([]);

  const { loading, error } = useGetCampaigns(accessToken, filter, setCampaigns);

  const deleteCampaign = useDeleteCampaign(accessToken, setCampaigns);
  const completeCampaign = useCompleteCampaign(accessToken, setCampaigns);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = campaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);


  const handleCampaignClick = (id) => {
    navigate(`/campaign/${id}`);
  };

  const handleAddCampaign = () => navigate("/campaign/new");

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;
  return (



    <div className={styles.outerContainer}>
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.filterBox}>
            <select id="statusFilter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Launched">Launched</option>
            </select>
          </div>
          <h1 className={styles.title}>Campaigns</h1>
          <button className={styles.button2} onClick={handleAddCampaign}>+ Add Campaign</button>
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
                <div key={c.id} className={styles.listItem}>
                  <button
                    className={styles.campaignButton}
                    onClick={() => handleCampaignClick(c.id, c.mailingList?.id)}
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
                  <span>{c.MailingList?.listName || "No mailing list"}</span>
                  <span className={styles.actions}>
                    <button className={styles.trashcan} onClick={() => deleteCampaign(c.id)}><FaTrash /></button>
                    {c.status?.toLowerCase() === "launched" && (<button className={styles.tickButton} onClick={() => completeCampaign(c.id) }><FaCheck /></button>)}
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
              <span>
                Page {currentPage} / {totalPages}
              </span>
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
