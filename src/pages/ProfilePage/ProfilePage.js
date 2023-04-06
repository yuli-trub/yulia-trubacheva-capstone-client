import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, Route } from "react-router-dom";
import SavedEvents from "../../components/SavedEvents/SavedEvents";

const Profile = ({ handleLogout, BACKEND_URL }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const authToken = sessionStorage.getItem("authToken");

      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/profile`, {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        });

        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        handleLogout();
      }
    };

    getUserData();
  }, [handleLogout]);

  console.log(userData);

  return (
    <>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && (
          <>
            <h1>Welcome {userData.user.name}</h1>
            <h2>Your Profile:</h2>
            <p>Email: {userData.user.email}</p>
            <p>age: {userData.user.age}</p>
            <p>Bio: {userData.user.bio}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
      <NavLink to="/profile/friends">Friends</NavLink>
      <NavLink to="/profile/events">Events</NavLink>
      <Outlet />
    </>
  );
};

export default Profile;
