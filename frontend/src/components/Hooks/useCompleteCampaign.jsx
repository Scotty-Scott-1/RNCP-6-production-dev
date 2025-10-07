import { useState, useEffect } from "react";

export const useCompleteCampaign = (accessToken, setCampaigns) => {

  const completeCampaign = async (id) => {
   try {
      const response = await fetch(`/api/campaign/${id}/complete`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCampaigns((prevCampaigns) =>
          prevCampaigns.map((c) =>
            c.id === id ? { ...c, status: "Completed" } : c
          )
        );


      } else {
        const errorData = await response.json();
        console.error("Complete failed:", errorData);
      }
    } catch (err) {
      console.error("Error completing campaign:", err);
    }
  };

  return completeCampaign;
}
