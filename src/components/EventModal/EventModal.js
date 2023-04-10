import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventModal.scss";

const EventModal = ({ BACKEND_URL }) => {
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
      await axios.put(`${BACKEND_URL}/api/events/${selectedEvent.id}`, {
        isSaved: 1,
      });

      saveUserEvent();
      getEventById();
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
      await axios.put(`${BACKEND_URL}/api/events/${selectedEvent.id}`, {
        isSaved: 0,
      });

      deleteUserEvent();

      getEventById();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };
  return (
    <>
      {selectedEvent && (
        <section className="event-modal__wrap">
          <div className="event-modal__navigate">
            <p className="event-modal__arrow" onClick={navigateHandler}>
              back
            </p>
          </div>
          <div className="event-modal__img-wrap">
            <img
              src={selectedEvent.image}
              alt="event"
              className="event-modal__img"
            />
          </div>
          <h2 className="event-modal__title">{selectedEvent.name}</h2>
          <div className="event-modal__info">
            <p className="event-modal__location">{selectedEvent.location}</p>
            <p className="event-modal__date">
              {formatDate(selectedEvent.date)}
            </p>
          </div>
          <p className="event-modal__description">
            {selectedEvent.description}
          </p>
          {!selectedEvent.isSaved ? (
            <p className="event-modal__action" onClick={saveEvent}>
              Save
            </p>
          ) : (
            <p className="event-modal__action" onClick={unsaveEvent}>
              Delete
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default EventModal;
