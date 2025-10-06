import { useState } from "react";

export const useDeleteMailingList = (accessToken, setMyLists) => {

const deleteMailingList = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mailing list?")) return false;

    try {
      const response = await fetch(`/api/mailinglist/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to delete mailing list");
      }
      setMyLists((prevList) => prevList.filter(c => c.id !== id));
      return true;
    } catch (err) {
      console.error("Delete contact error:", err);
      return false;
    }
  };

  return { deleteMailingList };


};
