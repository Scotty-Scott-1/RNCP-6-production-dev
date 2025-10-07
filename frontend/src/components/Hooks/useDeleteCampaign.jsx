import { useState, useEffect } from "react";

export const useDeleteCampaign = (accessToken, setCampaigns) => {

  const deleteCampaign = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmed) return;

   try {
      const response = await fetch(`/api/campaign/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
      }
    } catch (err) {
      console.error("Error deleting campaign:", err);
    }
  };

  return deleteCampaign;
}
