import { useEffect, useState } from "react";
import "./EventsPage.scss";
import axios from "axios";
import SavedEvent from "../../components/SavedEvent/SavedEvent";
import search from "../../assets/icons/search.svg";
import NoAuthMessage from "../../components/NoAuthMessage/NoAuthMessage";


const EventsPage = ({ BACKEND_URL, isLoggedIn }) => {
  const [events, setEvents] = useState(null);
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [eventWasSaved, setEventWasSaved] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);


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
  }, [selectedLocation]);

  // Search
  const searchLocationHandler = async (location) => {
    try {
      if (!location) {
        setSelectedLocation(null);
        getEvents();
      } else {
        const { data } = await axios.get(`${BACKEND_URL}/api/events`);
        const locationEvents = data.filter(
          (event) => event.location.toLowerCase() === location.toLowerCase()
        );
        setEvents(locationEvents);
        setSelectedLocation(location);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Loading
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <> {isLoading && isLoggedIn && <div className="loader"></div>}
    {isLoading && !isLoggedIn && <NoAuthMessage />}

    {!isLoading && (
      <main className="events__wrap">
        <section className="search">
          <input
            type="text"
            placeholder="Enter a location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="search__input"
            onKeyPress={(e) =>
              e.key === "Enter" && searchLocationHandler(searchLocation)
            }
          />
          <button
            className="search__btn"
            onClick={() => searchLocationHandler(searchLocation)}
          >
            <img src={search} alt="search" className="search__icon" />
          </button>
        </section>
        {!searchLocation &&
          locations &&
          events &&
          locations.map((location) => {
            const locationEvents = events.filter(
              (event) => event.location === location.city
            );
            const isLocationSelected = selectedLocation === location.city;
            return (
              <article className="location" key={location.id}>
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

                {isLocationSelected && (
                  <div className="events__list">
                    {locationEvents.map((event) => {
                      if (event.location === location.city) {
                        return <SavedEvent event={event} key={event.id} />;
                      }
                    })}
                  </div>
                )}
              </article>
            );
          })}
        {searchLocation && events && (
          <div className="events__list">
            {events.map((event) => {
              return <SavedEvent event={event} key={event.id} />;
            })}
          </div>
        )}
      </main>)}
    </>
  );
};

export default EventsPage;
