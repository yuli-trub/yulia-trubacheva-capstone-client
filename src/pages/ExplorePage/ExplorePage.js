import { useEffect, useState } from "react";
import "./ExplorePage.scss";
import "./ExplorePage.scss";
import axios from "axios";
import SwipeCard from "../../components/SwipeCard/SwipeCard";

const ExplorePage = ({ BACKEND_URL }) => {
  const [profiles, setProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get all profiles
  const getProfiles = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/profiles`);
    const norSavedProfiles = data.filter((profile) => profile.isSwiped === 0);
    setProfiles(norSavedProfiles);
    setFilteredProfiles(norSavedProfiles);
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
  if (!profiles && !locations && !filteredProfiles) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <main className="explore">
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
        <div className="swipe-cards">
          {filteredProfiles &&
            filteredProfiles.map((profile) => {
              return (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  getProfiles={getProfiles}
                  BACKEND_URL={BACKEND_URL}
                />
              );
            })}
        </div>
      </main>
    </>
  );
};

export default ExplorePage;
