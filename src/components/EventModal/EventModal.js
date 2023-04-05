import axios from "axios";
import { useEffect } from "react";

const EventModal = ({ event, BACKEND_URL }) => {
  console.log(event.id);
  console.log(`${BACKEND_URL}/api/events/${event.id}`);
  const saveEvent = async () => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/events/${event.id}`,
        {
          isSaved: 1,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unsaveEvent = async () => {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/events/${event.id}`,
        {
          isSaved: 0,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="event__wrap">
      <h2 className="event__title">{event.name}</h2>
      <p className="event__description">{event.description}</p>
      <p className="event__date">{event.date}</p>
      {!event.isSaved ? (
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
