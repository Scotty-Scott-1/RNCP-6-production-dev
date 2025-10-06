// hooks/useMailingList.js
import { useState, useEffect } from "react";

export const getOneMailingList = (id, accessToken) => {
  const [myList, setMyList] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    if (!id) return;

    const fetchList = async () => {
      try {
        const response = await fetch(`/api/mailinglist/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMyList(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchList();
  }, [id, accessToken]);

  return myList;
};
