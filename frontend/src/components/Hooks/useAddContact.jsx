import { useState } from "react";

export const useAddContact = (accessToken, mailingListId, setContactList) => {

  const addContact = async (newContact) => {
    if (!newContact.name || !newContact.email) {
      alert("Name and email are required.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: mailingListId, contact: newContact }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add contact");
      }

      const addedContact = await response.json();

      // Update the contact list state
      setContactList((prevList) => [...prevList, addedContact]);

      return addedContact;
    } catch (err) {
      console.error("Add contact error:", err);
    } finally {
    }
  };

  return { addContact };
};
