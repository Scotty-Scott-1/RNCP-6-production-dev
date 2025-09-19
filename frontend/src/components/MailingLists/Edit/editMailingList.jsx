import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styles from '../../MailingLists/MailingLists.module.css';
import { useAuth } from "../../../security/authContext.jsx";
import { getOneMailingList } from "./hooks/GetOneList.jsx";

const EditMailingList = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState([]); // === ADDED: local contacts state
  const [newContact, setNewContact] = useState({   // === ADDED: form state for new contact
    name: "",
    lastName: "",
    email: "",
    department: "",
    role: ""
  });

  const { id } = useParams();
  const myList = getOneMailingList(id, accessToken);

  useEffect(() => {
    if (myList) {
      setListName(myList.listName || "");
      setDescription(myList.description || "");
      setContacts(myList.contacts || []); // === ADDED: populate contacts
    }
  }, [myList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listName || !description) {
      alert("Attrs should not be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/mailinglist/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, listName, description })
      });

      if (response.ok) {
        console.log("List updated");
      }
      navigate(`/mailinglists`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong updating the list.");
    }
  };

  // === ADDED: Handle add new contact ===
  const handleAddContact = async () => {
    // basic validation
    if (!newContact.name || !newContact.email) {
      alert("Name and email are required.");
      return;
    }

    try {
      const response = await fetch("https://localhost:3000/api/mailinglist/addcontact", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, contact: newContact })
      });

      if (response.ok) {
        const updated = await response.json();
        setContacts(updated.contacts);
        setNewContact({ name: "", lastName: "", email: "", department: "", role: "" }); // clear form
      } else {
        alert("Failed to add contact");
      }
    } catch (err) {
      console.error("Add contact error:", err);
      alert("Something went wrong adding the contact.");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Edit Mailing List</h1>

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

      <div className={styles.listHeader} style={{ marginTop: '1rem' }}>
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
        <span>Department</span>
        <span>Role</span>
      </div>
      <div className={styles.list}>
        {contacts?.length > 0 ? (
          contacts.map((c, i) => (
            <div key={c._id ?? i} className={styles.listItem}>
              <input className={styles.input} value={c.name || ''} readOnly />
              <input className={styles.input} value={c.lastName || ''} readOnly />
              <input className={styles.input} value={c.email || ''} readOnly />
              <input className={styles.input} value={c.department || ''} readOnly />
              <input className={styles.input} value={c.role || ''} readOnly />
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
        <input
          className={styles.input}
          placeholder="First Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Last Name"
          value={newContact.lastName}
          onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Department"
          value={newContact.department}
          onChange={(e) => setNewContact({ ...newContact, department: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Role"
          value={newContact.role}
          onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
        />
      </div>
      <button type="button" className={styles.button2} onClick={handleAddContact}>
        Add Contact
      </button>

      <button type="submit" className={styles.button2} style={{ marginTop: "1rem" }}>
        Save Changes
      </button>
    </form>
  );
};

export default EditMailingList;
