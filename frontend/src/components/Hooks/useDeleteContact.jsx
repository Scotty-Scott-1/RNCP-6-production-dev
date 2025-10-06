import { useState } from "react";

export const useDeleteContact = (accessToken, setContactList) => {

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return false;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to delete contact");
      }
      setContactList((prevList) => prevList.filter(c => c.id !== id));
      return true;
    } catch (err) {
      console.error("Delete contact error:", err);
      return false;
    }
  };

  return { deleteContact };
};
