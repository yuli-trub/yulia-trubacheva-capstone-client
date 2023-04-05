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
  return (
    <>
      <div className="location">
        <h2 className="location__title">{}</h2>
      </div>
    </>
  );
};

export default EventsPage;
