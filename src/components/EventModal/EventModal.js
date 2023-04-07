import axios from "axios";
import { useEffect, useState } from "react";

const EventModal = ({ event, BACKEND_URL, setEventWasSaved, events }) => {
  // const [isSaved, setIsSaved] = useState(false);
  const eventId = event.id;

  const updatedEvent = events.find((event) => event.id === eventId);

  const saveEvent = async () => {
    const saveUserEvent = async () => {
      const authToken = sessionStorage.getItem("authToken");
      console.log(authToken);
      await axios.post(`${BACKEND_URL}/api/users/events/${eventId}`, null, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });
    };
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/events/${updatedEvent.id}`,
        {
          isSaved: 1,
        }
      );
      console.log(data);
      saveUserEvent();
      setEventWasSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unsaveEvent = async () => {
    const deleteUserEvent = async () => {
      const authToken = sessionStorage.getItem("authToken");
      console.log(authToken);
      await axios.delete(`${BACKEND_URL}/api/users/events/${eventId}`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });
    };
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/events/${updatedEvent.id}`,
        {
          isSaved: 0,
        }
      );
      console.log(data);
      deleteUserEvent();
      setEventWasSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="event__wrap">
      <h2 className="event__title">{updatedEvent.name}</h2>
      <p className="event__description">{updatedEvent.description}</p>
      <p className="event__date">{updatedEvent.date}</p>
      {!updatedEvent.isSaved ? (
        <p className="event__save" onClick={saveEvent}>
          Save
        </p>
      ) : (
        <p className="event__unsave" onClick={unsaveEvent}>
          unSave
        </p>
      )}
    </div>
  );
};

export default EventModal;
