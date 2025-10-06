import { useState, useEffect } from "react";

export const useGetCampaigns = (accessToken, filter) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
      try {
        const response = await fetch(`/api/campaign/get/${filter}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

		if (response.ok) {
		  const data = await response.json();
		  setCampaigns(data);
		} else {
          const error = await response.json();
          setError(error.message || "Failed to fetch campaigns");
		}
	  } catch (err) {
		setError(err.message);
	  } finally {
		setLoading(false);
	  }
	};

	if (accessToken) fetchCampaigns();
  }, [accessToken, filter]);

  return { campaigns, loading, error, setCampaigns };
}
