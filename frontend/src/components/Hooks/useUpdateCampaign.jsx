import { useState } from "react";

export const useUpdateCampaign = (accessToken) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCampaign = async (id, campaignName, description) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/campaign/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignName, description }),
      });

      setLoading(false);

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to update campaign");
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      setError("Something went wrong updating the campaign.");
      setLoading(false);
      return false;
    }
  };

  return { updateCampaign, loading, error };
};
