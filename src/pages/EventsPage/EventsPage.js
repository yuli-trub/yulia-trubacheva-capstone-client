import { useEffect, useState } from "react";
import "./EventsPage.scss";
import axios from "axios";

const EventsPage = ({ BACKEND_URL }) => {
  const [events, setEvents] = useState(null);
  const [locations, setLocations] = useState(null);

  // Get all profiles
  const getEvents = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/events`);
    setEvents(data);
  };

  useEffect(() => {
    try {
      getEvents();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Get all locations
  const getLocations = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/locations`);
    setLocations(data);
  };
  useEffect(() => {
    try {
      getLocations();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Loading
  if (!events && !locations) {
    return <div className="loader"></div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <>
      {locations.map((location) => {
        return (
          <div className="location">
            <h2 className="location__title">{location.city}</h2>
            {events.map((event) => {
              if (event.location === location.city) {
                return (
                  <div className="event">
                    <h3 className="event__name">{event.name}</h3>
                    <p className="event__date">{formatDate(event.date)}</p>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </>
  );
};

export default EventsPage;
