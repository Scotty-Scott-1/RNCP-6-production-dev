import { useState, useEffect } from "react";

export const useGetCampaigns = (accessToken, filter, setCampaigns) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/campaign/?status=${filter}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to fetch campaigns");
        }

        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [accessToken, filter]);

  return { loading, error };
};
