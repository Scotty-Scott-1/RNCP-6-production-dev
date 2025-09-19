// hooks/useMailingList.js
import { useState, useEffect } from "react";

export const getOneMailingList = (id, accessToken) => {
  const [myList, setMyList] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/mailinglist/get/one", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listID: id }),
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
