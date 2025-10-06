import { useState, useEffect } from "react";

export const useGetContactList = (id, accessToken) => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    if (!accessToken || !id) return;

    const fetchContacts = async () => {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch contacts");

        const data = await response.json();
        setContactList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContacts();
  }, [id, accessToken]);

  return { contactList, setContactList };
};
