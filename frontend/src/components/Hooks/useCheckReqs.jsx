import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCheckReqs = (accessToken) => {
  const [message, setMessage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkReqs = async () => {
      try {
        console.log("Checking reqs with token:", accessToken);

        const response = await fetch("/api/admin/check/reqs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setMessage("Failed");
          return;
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error("Error checking reqs:", err);
      }
    };

    if (accessToken) {
      checkReqs();
    }
  }, [accessToken, location.pathname]);

  return { message };
};
