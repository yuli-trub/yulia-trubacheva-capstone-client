import { useEffect, useState } from "react";
import "./ExplorePage.scss";
import "./ExplorePage.scss";
import axios from "axios";

const ExplorePage = ({ BACKEND_URL }) => {
  const [profiles, setProfiles] = useState(null);
  const [profilesModified, setProfilesModified] = useState(false);

  // Get all profiles

  const getProfiles = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/api/profiles`);
    setProfiles(data);
    setProfilesModified(false);
    // console.log(data);
  };

  useEffect(() => {
    try {
      getProfiles();
    } catch (error) {
      console.log(error);
    }
  }, [profilesModified]);

  // Swiping left
  const leftHandler = (profileId) => {
    console.log(profileId);
    const notFriend = async () => {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/profiles/${profileId}`,
        { isSwiped: 1 }
      );
      console.log(data);
    };

    try {
      notFriend();
      setProfilesModified(true);
      getProfiles();
      console.log(profiles);
    } catch (error) {
      console.log(error);
    }
  };

  // Swiping right
  const rightHandler = (profileId) => {
    console.log(profileId);
    const isFriend = async () => {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/profiles/${profileId}`,
        { isSwiped: 1, isFriend: 1 }
      );
      console.log(data);
    };

    try {
      isFriend();
      setProfilesModified(true);
      getProfiles();
    } catch (error) {
      console.log(error);
    }
  };

  // Loading

  if (!profiles) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {profiles.map((profile) => {
        return (
          <>
            <p
              onClick={() => {
                leftHandler(profile.id);
              }}
            >
              left
            </p>
            <p> {profile.name}</p>
            <p
              onClick={() => {
                rightHandler(profile.id);
              }}
            >
              right
            </p>
          </>
        );
      })}
    </>
  );
};

export default ExplorePage;
