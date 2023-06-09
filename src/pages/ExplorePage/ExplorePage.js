import { useEffect, useState } from "react";
import "./ExplorePage.scss";
import "./ExplorePage.scss";
import axios from "axios";
import SwipeCards from "../../components/SwipeCards/SwipeCards";
import NoAuthMessage from "../../components/NoAuthMessage/NoAuthMessage";

const ExplorePage = ({ BACKEND_URL, isLoggedIn }) => {
  const [profiles, setProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get all profiles
  const getProfiles = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/profiles`);
    console.log(data);
    // const norSavedProfiles = data.filter((profile) => profile.isSwiped === 0);
    // console.log(norSavedProfiles);
    setProfiles(data);
    setFilteredProfiles(data);
  };

  // on mount useEffect
  useEffect(() => {
    try {
      getProfiles();
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

  //Filter by location and date

  const handleSelectChange = (event) => {
    const location = event.target.value;
    console.log(event.target);
    setSelectedLocation(location);
    handleFilterChange(location);
  };

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    handleFilterChange(selectedLocation, date, endDate);
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    handleFilterChange(selectedLocation, startDate, date);
  };

  const handleFilterChange = (location, startDate, endDate) => {
    console.log(
      `Selected filter option: ${location}, ${startDate}, ${endDate}`
    );
    if (!location) {
      setSelectedLocation("");
      setFilteredProfiles(profiles);
      return;
    }

    // initial filter
    let filteredProfiles = profiles.filter(
      (profile) => profile.location === location
    );

    // second filter
    if (startDate && endDate) {
      filteredProfiles = filteredProfiles.filter((profile) => {
        const profileStartDate = profile.start_date.substring(0, 10);
        const profileEndDate = profile.end_date.substring(0, 10);
        return (
          Date.parse(profileStartDate) >= Date.parse(startDate) &&
          Date.parse(profileEndDate) <= Date.parse(endDate)
        );
      });
    }

    setFilteredProfiles(filteredProfiles);
  };

  // Loading
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoading && isLoggedIn && <div className="loader"></div>}
      {isLoading && !isLoggedIn && <NoAuthMessage />}
      {!isLoading && (
        <main className="explore">
          <>
            <div className="filters">
              <select
                value={selectedLocation}
                onChange={handleSelectChange}
                className="filters__location"
              >
                <option value="">Select a location</option>
                {locations &&
                  locations.map((location) => (
                    <option key={location.id} value={location.city}>
                      {location.city}
                    </option>
                  ))}
              </select>
              <div className="filters__dates">
                <div className="filters__container">
                  <label htmlFor="date" className="filters__label">
                    Start Date
                  </label>
                  <input
                    className="filters__date"
                    type="date"
                    value={startDate ? startDate : "Start Date"}
                    onChange={handleStartDateChange}
                    placeholder="Start Date"
                  />
                </div>
                <div className="filters__container">
                  <label htmlFor="date" className="filters__label">
                    End Date
                  </label>

                  <input
                    className="filters__date"
                    type="date"
                    value={endDate ? endDate : "End Date"}
                    onChange={handleEndDateChange}
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            {filteredProfiles && (
              <SwipeCards
                profiles={filteredProfiles}
                BACKEND_URL={BACKEND_URL}
              />
            )}

        
              <p className="explore__empty">No available profiles</p>
        
          </>
        </main>
      )}
    </>
  );
};

export default ExplorePage;
