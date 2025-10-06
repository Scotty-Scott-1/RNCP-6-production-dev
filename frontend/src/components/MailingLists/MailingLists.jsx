import React, { useState, useEffect } from "react";
import styles from "./mailingListList.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";
import { FaTrash } from "react-icons/fa";
import { useDeleteMailingList } from "./hooks/useDeleteMailingList.jsx";
import { useGetMailingLists } from "./hooks/useGetMailingLists.jsx";



const MailingLists = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [myLists, setMyLists] = useState([]);
  const { loading, error } = useGetMailingLists(accessToken, setMyLists);
  const { deleteMailingList } = useDeleteMailingList(accessToken, setMyLists);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = myLists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(myLists.length / itemsPerPage);

  const handleListClick = (id) => {
    navigate(`/mailinglist/edit/${id}`);
  };

  const handleAddList = () => {
    navigate("/newmailinglist");
  };

const handleDeleteList = async (id) => {
  const success = await deleteMailingList(id);
  if (success) alert("Mailing list deleted successfully");
};


  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mailing Lists</h1>
          <button className={styles.button2} onClick={handleAddList}>
            + Add Mailing List
          </button>
        </div>

        {myLists.length > 0 ? (
          <>
            <div className={styles.listHeader}>
              <span>Name</span>
              <span>Number of Contacts</span>
              <span>Date Created</span>
              <span>Actions</span>
            </div>

            <div className={styles.list}>
              {currentItems.map((list) => (
                <div key={list.id} className={styles.listItem}>
                  <button
                    className={styles.campaignButton}
                    onClick={() => handleListClick(list.id)}
                  >
                    {list.listName}
                  </button>
                  <span>{list.contacts?.length || 0}</span>
                  <span>{new Date(list.createdAt).toLocaleDateString()}</span>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteList(list.id)}
                  >
                    <FaTrash />
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
        ) : (
          <p>No mailing lists found.</p>
        )}
      </div>
    </div>
  );
};

export default MailingLists;
