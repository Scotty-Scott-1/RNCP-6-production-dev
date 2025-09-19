import React, { useState, useEffect, use } from "react";
import styles from "./Campaign.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";


const Campaigns = () => {
	const navigate = useNavigate();
	const {accessToken} = useAuth()
	const [myCampaigns, setMyCampaigns] = useState([]);

	useEffect(() => {
		const getCampaigns = async() => {
			try {
				const response = await fetch("https://localhost:3000/api/campaign/get", {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${accessToken}`,
						"Content-Type": "application/json"
					}
				});
					if (response.ok) {
						const data = await response.json();
						console.log(data);
						setMyCampaigns(data);
						return;
					}
			} catch(error) {
				console.log(error);
				return;
			}
		}
		if (accessToken) {
			console.log("trying to fetch campaigns owned by this user")
			getCampaigns();

		}
	}, [accessToken]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = myCampaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(myCampaigns.length / itemsPerPage);

  const handleCampaignClick = (id, listid) => {
    console.log("Clicked campaign list:", id);
    console.log("associsated list", listid);
    navigate(`/campaign/edit/${id}/${listid}`);
  };

  const handleAddCampaign = () => {
    console.log("Add new campaign");
    navigate("/campaign/new");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Campaigns</h1>
      {myCampaigns.length === 0 && (
          <button className={styles.button2} onClick={handleAddCampaign }>
            + Add Campaign
          </button>
        )}
      </div>


      {/* Table-like header row */}
      <div className={styles.listHeader}>
        <span>Name</span>
        <span>Date Created</span>
        <span>End time</span>
        <span>mailing list</span>
        <span>Actions</span>
      </div>

      {/* Campaign entries */}
      <div className={styles.list}>
        {currentItems.map((c) => (
          <div key={c._id} className={styles.listItem}>
            <button
              className={styles.campaignButton}
              onClick={() => handleCampaignClick(c._id, c.mailingList._id)}
            >
              {c.campaignName}
            </button>
            <span>{new Date(c.startTime).toLocaleDateString()}</span>
            <span>{new Date(c.endTime).toLocaleDateString()}</span>
            <span>{c.mailingList?.listName || "No mailing list"}</span>
            <button className={styles.button} onClick={handleAddCampaign}>
              +
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
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
  );
};

export default Campaigns;
