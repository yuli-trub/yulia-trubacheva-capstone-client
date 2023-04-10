import axios from "axios";
import React, { useEffect, useState } from "react";
import SavedEvent from "../SavedEvent/SavedEvent";
import "./SavedEvents.scss";

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
    <>
      <div className="saved-events">
        {savedEvents.length === 0 && (
          <p className="">No events to display yet</p>
        )}
        {savedEvents.map((event) => {
          return <SavedEvent event={event} key={event.id} />;
        })}
      </div>
    </>
  );
};

export default SavedEvents;
