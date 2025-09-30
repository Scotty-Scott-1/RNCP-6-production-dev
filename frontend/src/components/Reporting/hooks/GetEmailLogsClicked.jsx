import { useState, useEffect } from "react";

export const getEmailLogsClicked = (id, accessToken) => {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
	if (!accessToken) return;

	const fetchEmailLogs = async () => {
	  try {
		const campaignID = id;
		const response = await fetch(`/api/emaillog/clicked/${campaignID}`, {
		  method: "GET",
		  headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		  },
		});
		if (response.ok) {
		  const data = await response.json();
		  setLogs(data);
		}
	  } catch (err) {
		console.error(err);
	  }
	};

	fetchEmailLogs();
  }, [id, accessToken]);

  return (logs);
};
