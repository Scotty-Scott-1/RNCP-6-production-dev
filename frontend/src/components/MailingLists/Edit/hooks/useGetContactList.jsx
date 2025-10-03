import { useState, useEffect } from "react";

export const useGetContactList = (id, accessToken) => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken || !id) return;

    const fetchContacts = async () => {
      setLoading(true);
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [id, accessToken]);

  return { contactList, setContactList, loading, error };
};
