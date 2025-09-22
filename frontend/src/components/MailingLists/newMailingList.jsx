import React, { useState } from 'react';
import styles from './MailingLists.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";

const NewMailingList = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listName || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("api/mailinglist/new", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          listName,
          description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Mailing list created successfully:", data);
        navigate("/mailinglists");
      } else {
        const errorData = await response.json();
        console.error("Error creating mailing list:", errorData);
        alert("Failed to create mailing list. Please try again.");
      }
    } catch (error) {
      console.error("Error creating mailing list:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Mailing Lists</h1>
        <label htmlFor="mailing"><p>Mailing List Name</p></label>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className={styles.input}
          placeholder="Mailing List Name"
          required
          id='mailing'
          />
          <label htmlFor="desc"><p>Description</p></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            placeholder="Description"
            required
            id="desc"
            rows={4}
          />

        <button type="submit" className={styles.button2}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewMailingList;
