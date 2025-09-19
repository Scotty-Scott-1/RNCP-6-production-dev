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
      /*
      const response = await fetch("https://localhost:5001/api/mailinglist/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listName,
          description,
          createdBy: user.id,
        }),
      });*/
      const response = await fetch("http://localhost:3000/api/mailinglist/new", {
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
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Mailing Lists</h1>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className={styles.input}
        placeholder="Mailing List Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
        placeholder="Description"
        required
      />

      <button type="submit" className={styles.button2}>
        Submit
      </button>
    </form>
  );
};

export default NewMailingList;
