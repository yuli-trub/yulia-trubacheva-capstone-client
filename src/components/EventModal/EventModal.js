import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventModal = ({ BACKEND_URL, setSelectedEventWasSaved, events }) => {
  // const [isSaved, setIsSaved] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const { eventId } = useParams();

  const getEventById = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/events/${eventId}`);
    setSelectedEvent(data[0]);
  };

  useEffect(() => {
    try {
      getEventById();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        `${BACKEND_URL}/api/events/${selectedEvent.id}`,
        {
          isSaved: 1,
        }
      );
      console.log(data);
      saveUserEvent();
      getEventById();
      // setSelectedEventWasSaved(true);
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
        `${BACKEND_URL}/api/events/${selectedEvent.id}`,
        {
          isSaved: 0,
        }
      );

      deleteUserEvent();
      // setSelectedEventWasSaved(true);
      getEventById();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedEvent);
  return (
    <>
      {selectedEvent && (
        <div className="event__wrap">
          <h2 className="event__title">{selectedEvent.name}</h2>
          <p className="event__description">{selectedEvent.description}</p>
          <p className="event__date">{selectedEvent.date}</p>
          {!selectedEvent.isSaved ? (
            <p className="event__save" onClick={saveEvent}>
              Save
            </p>
          ) : (
            <p className="event__unsave" onClick={unsaveEvent}>
              unSave
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default EventModal;
