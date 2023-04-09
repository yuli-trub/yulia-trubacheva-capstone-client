import axios from "axios";
import React, { useEffect, useState } from "react";
import SavedEvent from "../SavedEvent/SavedEvent";
import "./SavedEvents.scss";
import EventModal from "../EventModal/EventModal";
import { Link } from "react-router-dom";

const SavedEvents = ({ BACKEND_URL }) => {
  const [savedEvents, setSavedEvents] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  // Modal

  const modalHandler = (eventId) => {
    setModalShown(true);
    const chosenEvent = savedEvents.find((event) => event.id === eventId);
    setSelectedEvent(chosenEvent);
  };

  if (!savedEvents) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="saved-events">
        {savedEvents.map((event) => {
          return (
            <Link to={`/events/${event.id}`} className="saved-events__link">
              <SavedEvent event={event} modalHandler={modalHandler} />
            </Link>
          );
        })}
      </div>
      {/* {modalShown && (
        <EventModal
          BACKEND_URL={BACKEND_URL}
          event={selectedEvent}
          events={savedEvents}
        />
      )} */}
    </>
  );
};

export default SavedEvents;
