import { useEffect, useState } from "react";
import "./EventsPage.scss";
import axios from "axios";
import EventModal from "../../components/EventModal/EventModal";

const EventsPage = ({ BACKEND_URL }) => {
  const [events, setEvents] = useState(null);
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventWasSaved, setEventWasSaved] = useState(false);
  const [test, setTest] = useState("test");

  // Get all events
  const getEvents = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/events`);
    setEvents(data);
  };

  useEffect(() => {
    try {
      getEvents();
      setEventWasSaved(false);
    } catch (error) {
      console.log(error);
    }
  }, [eventWasSaved]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };

  // Modal

  const modalHandler = (eventId) => {
    setModalShown(true);
    const chosenEvent = events.find((event) => event.id === eventId);
    setSelectedEvent(chosenEvent);
  };

  // Loading
  if (!events && !locations) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className="events__wrap">
        {locations &&
          events &&
          locations.map((location) => {
            const locationEvents = events.filter(
              (event) => event.location === location.city
            );
            const isLocationSelected = selectedLocation === location.city;
            return (
              <div className="location">
                <h2
                  className="location__title"
                  onClick={() =>
                    setSelectedLocation(
                      isLocationSelected ? null : location.city
                    )
                  }
                >
                  {location.city}
                </h2>
                {isLocationSelected &&
                  locationEvents.map((event) => {
                    if (event.location === location.city) {
                      return (
                        <div
                          className="event"
                          onClick={() => {
                            modalHandler(event.id);
                          }}
                        >
                          <h3 className="event__name">{event.name}</h3>
                          <p className="event__date">
                            {formatDate(event.date)}
                          </p>
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })}
      </div>
      {modalShown && (
        <EventModal
          BACKEND_URL={BACKEND_URL}
          event={selectedEvent}
          setEventWasSaved={setEventWasSaved}
          events={events}
        />
      )}
    </>
  );
};

export default EventsPage;
