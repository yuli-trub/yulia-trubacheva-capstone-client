import axios from "axios";
import React, { useEffect, useState } from "react";

const SavedEvents = ({ BACKEND_URL }) => {
  const [savedEvents, setSavedEvents] = useState(null);

  const getSavedEvents = async () => {
    const authToken = sessionStorage.getItem("authToken");

    const { data } = await axios.get(`${BACKEND_URL}/api/users/profile`, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });
    setSavedEvents(data.events);
  };

  useEffect(() => {
    try {
      getSavedEvents();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!savedEvents) {
    return <p>Loading</p>;
  }

  return (
    <div className="saved-events">
      {savedEvents.map((event) => {
        return <p className="event__name">{event.name}</p>;
      })}
    </div>
  );
};

export default SavedEvents;
