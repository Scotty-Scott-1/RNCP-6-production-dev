import { useState, useEffect } from "react";

export const useGetMailingLists = (accessToken, setMyLists) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMailingLists = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/mailinglist", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          const msg = await response.text();
          throw new Error(msg || "Failed to fetch mailing lists");
        }

        const data = await response.json();
        setMyLists(data);
      } catch (err) {
        console.error("Error fetching mailing lists:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) getMailingLists();
  }, [accessToken]);

  return { loading, error };
};
