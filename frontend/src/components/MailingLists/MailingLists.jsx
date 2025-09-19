import React, { useState, useEffect } from "react";
import styles from "./MailingLists.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";

const MailingLists = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [myLists, setMyLists] = useState([]);

  useEffect(() => {
    const getMailingLists = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/mailinglist/get", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMyLists(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken) getMailingLists();
  }, [accessToken]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = myLists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(myLists.length / itemsPerPage);

  const handleListClick = (id) => {
    console.log("Clicked mailing list:", id);
    navigate(`/mailinglist/edit/${id}`);

  };

  const handleAddList = () => {
    navigate("/newmailinglist");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mailing Lists</h1>
        {myLists.length === 0 && (
          <button className={styles.button} onClick={handleAddList}>
            + Add Mailing List
          </button>
        )}
      </div>

      {/* Table-like header row */}
      {myLists.length > 0 && (
        <>
          <div className={styles.listHeader}>
            <span>Name</span>
            <span>Number of Contacts</span>
            <span>Date Created</span>
            <span>Actions</span>
          </div>

          <div className={styles.list}>
            {currentItems.map((list) => (
              <div key={list._id} className={styles.listItem}>
                <button
                  className={styles.campaignButton}
                  onClick={() => handleListClick(list._id)}
                >
                  {list.listName}
                </button>
                <span>{list.contacts?.length || 0}</span>
                <span>{new Date(list.createdAt).toLocaleDateString()}</span>
                <button className={styles.button} onClick={handleAddList}>
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
        </>
      )}
    </div>
  );
};

export default MailingLists;
