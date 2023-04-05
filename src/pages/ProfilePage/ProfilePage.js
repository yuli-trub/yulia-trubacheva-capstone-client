import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <>
          <h1>Welcome {userData.name}</h1>
          <h2>Your Profile:</h2>
          <p>Email: {userData.email}</p>
          <p>age: {userData.age}</p>
          <p>Bio: {userData.bio}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Profile;
