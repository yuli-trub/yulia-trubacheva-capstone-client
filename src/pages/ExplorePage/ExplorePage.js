import { useEffect, useState } from "react";
import "./ExplorePage.scss";
import "./ExplorePage.scss";
import axios from "axios";
import SwipeCard from "../../components/SwipeCard/SwipeCard";

const ExplorePage = ({ BACKEND_URL }) => {
  const [profiles, setProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  // const [profilesModified, setProfilesModified] = useState(false);
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get all profiles
  const getProfiles = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/profiles`);
    setProfiles(data);
    setFilteredProfiles(data);
    // setProfilesModified(false);
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

  //Filter by location

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
    // setProfilesModified(true);
  };

  // Loading
  if (!profiles && !locations && !filteredProfiles) {
    return <div className="loader"></div>;
  }

  return (
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
        <input
          type="date"
          value={`select date ${startDate}`}
          onChange={handleStartDateChange}
        />
        <input
          type="date"
          value={`select date ${endDate}`}
          onChange={handleEndDateChange}
        />
      </div>
      <div className="swipe-cards">
        {filteredProfiles &&
          filteredProfiles.map((profile) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              // setProfilesModified={setProfilesModified}
              getProfiles={getProfiles}
              BACKEND_URL={BACKEND_URL}
            />
          ))}
      </div>
    </>
  );
};

export default ExplorePage;
