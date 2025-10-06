import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styles from './editMailingList.module.css';
import { useAuth } from "../../security/authContext.jsx";
import { getOneMailingList } from "../Hooks/useGetOneMailingList.jsx";
import { useGetContactList } from "../Hooks/useGetContactList.jsx";
import { FaTrash } from "react-icons/fa";
import { useUpdateMailingList } from "../Hooks/useUpdateMailingList.jsx";
import { useAddContact } from "../Hooks/useAddContact.jsx";
import { useDeleteContact } from "../Hooks/useDeleteContact.jsx";

const EditMailingList = () => {
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
  const { contactList, setContactList } = useGetContactList(id, accessToken);
  const { updateMailingList } = useUpdateMailingList(accessToken);
  const { addContact } = useAddContact(accessToken, id, setContactList);
  const { deleteContact } = useDeleteContact(accessToken, setContactList);

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

const handleAddContact = () => {
  addContact(newContact);
  setNewContact({ name: "", lastName: "", email: "", department: "", role: "" });
};

const handleDeleteContact = async (contactId) => {
  const success = await deleteContact(contactId);
  if (success) alert("Contact deleted successfully");
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
        {contactList.length > 0 ? (
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
                onClick={() => handleDeleteContact(c.id)}
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
      <button type="submit" className={styles.button2} style={{ marginTop: "1rem" }}> Save </button>
    </form>
  </div>
);
}

export default EditMailingList;
