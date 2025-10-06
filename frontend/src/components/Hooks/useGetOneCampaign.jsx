import { useState, useEffect } from "react";

export const useGetOneCampaign = (id, accessToken) => {
  const [myCampaign, setMyCampaign] = useState(null);

  useEffect(() => {
	if (!accessToken) return;

	const fetchCampaign = async () => {
	  try {
		const response = await fetch(`/api/campaign/${id}`, {
		  method: "GET",
		  headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		  },
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
