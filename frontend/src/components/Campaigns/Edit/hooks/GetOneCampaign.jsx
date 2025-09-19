import { useState, useEffect } from "react";

export const getOneCampaign = (id, accessToken) => {
  const [myCampaign, setMyCampaign] = useState(null);

  useEffect(() => {
	if (!accessToken) return;

	const fetchCampaign = async () => {
	  try {
		const response = await fetch("http://localhost:3000/api/campaign/get/one", {
		  method: "POST",
		  headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ campaignID: id }),
		});
		if (response.ok) {
		  const data = await response.json();
		  setMyCampaign(data);
		}
	  } catch (err) {
		console.error(err);
	  }
	};

	fetchCampaign();
  }, [id, accessToken]);

  return myCampaign;
};
