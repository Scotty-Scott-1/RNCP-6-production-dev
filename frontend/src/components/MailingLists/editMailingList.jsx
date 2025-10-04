import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styles from './editMailingList.module.css';
import { useAuth } from "../../security/authContext.jsx";
import { getOneMailingList } from "./hooks/useGetOneList.jsx";
import { useGetContactList } from "./hooks/useGetContactList.jsx";
import { FaTrash } from "react-icons/fa";
import { useUpdateMailingList } from "./hooks/useUpdateMailingList.jsx";

const EditMailingList = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    lastName: "",
    email: "",
    department: "",
    role: ""
  });
  const { id } = useParams();
  const myList = getOneMailingList(id, accessToken);
  const { contactList, setContactList, loading, error } = useGetContactList(id, accessToken);
  const { updateMailingList, updateLoading, updateError } = useUpdateMailingList(accessToken);

  useEffect(() => {
    if (myList) {
      setListName(myList.listName || "");
      setDescription(myList.description || "");
    }
  }, [myList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMailingList({ id, listName, description });
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email) {
      alert("Name and email are required.");
      return;
    }

    try {
      const response = await fetch("/api/addcontact", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, contact: newContact })
      });

      if (response.ok) {
          setContactList((prevList) => [...prevList, newContact]);
          setNewContact({
            name: "",
            lastName: "",
            email: "",
            department: "",
            role: ""
          })
      } else {
        alert("Failed to add contact");
      }
    } catch (err) {
      console.error("Add contact error:", err);
      alert("Something went wrong adding the contact.");
    }
  };

  const handleDeleteContact = async (contactid, listid) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const response = await fetch(`/api/mailinglist/${listid}/${contactid}/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const updated = await response.json();
        setContacts(updated.contacts);
        alert("deleted contact")
      } else {
        alert("Failed to delete contact");
      }
    } catch (err) {
      console.error("Delete contact error:", err);
      alert("Something went wrong deleting the contact.");
    }
  };

return (
  <div className={styles.background}>
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Edit Mailing List</h1>

      <label htmlFor="listname"><p>Mailing List Name</p></label>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className={styles.input}
        placeholder="Mailing List Name"
        required
        id='listname'
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

      <div className={styles.listHeader} style={{ marginTop: '1rem' }}>
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
        <span>Department</span>
        <span>Role</span>
        <span>Delete</span>
      </div>

      <div className={styles.list}>
        {loading ? (
          <p>Loading contacts...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : contactList.length > 0 ? (
          contactList.map((c) => (
            <div key={c.id} className={styles.listItem}>
              <input className={styles.input} value={c.name || ''} readOnly />
              <input className={styles.input} value={c.lastName || ''} readOnly />
              <input className={styles.input} value={c.email || ''} readOnly />
              <input className={styles.input} value={c.department || ''} readOnly />
              <input className={styles.input} value={c.role || ''} readOnly />
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteContact(c.id, id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <div style={{ padding: '0.75rem 1rem', color: '#00ffff66' }}>
            No contacts yet.
          </div>
        )}
      </div>
      <h2 style={{ marginTop: "1.5rem" }}>Add New Contact</h2>
      <div className={styles.listItem}>
        <input className={styles.input} placeholder="First Name" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
        <input className={styles.input} placeholder="Last Name" value={newContact.lastName} onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })} />
        <input className={styles.input} placeholder="Email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
        <input className={styles.input} placeholder="Department" value={newContact.department} onChange={(e) => setNewContact({ ...newContact, department: e.target.value })} />
        <input className={styles.input} placeholder="Role" value={newContact.role} onChange={(e) => setNewContact({ ...newContact, role: e.target.value })} />
      </div>
      <button type="button" className={styles.button2} onClick={handleAddContact}> Add Contact </button>
      <button type="submit" className={styles.button2} style={{ marginTop: "1rem" }}> {loading ? "Updating..." : "Update"} </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  </div>
);
}

export default EditMailingList;
