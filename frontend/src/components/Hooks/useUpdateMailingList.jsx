import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUpdateMailingList = (accessToken) => {
  const navigate = useNavigate();

  const updateMailingList = async ({ id, listName, description }) => {
    if (!listName || !description) {
      alert("List name and description should not be empty.");
      return;
    }

    try {
      const response = await fetch(`/api/mailinglists/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName, description }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to update mailing list");
      }

      console.log("List updated successfully");
      navigate("/mailinglists");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return { updateMailingList };
};
