import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./ProfilePage.scss";
import NoAuthMessage from "../../components/NoAuthMessage/NoAuthMessage";

const Profile = ({ handleLogout, BACKEND_URL, isLoggedIn }) => {
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
    <>
      {isLoading && isLoggedIn && <div className="loader"></div>}
      {isLoading && !isLoggedIn && <NoAuthMessage />}
      {!isLoading && (
        <div className="profile">
          <div className="profile__data">
            <div className="profile__img">
              <img
                src={userData.user.avatar_url}
                alt="avatar"
                className="profile__avatar"
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">
                {userData.user.name}, {userData.user.age}
              </h1>
              <p className="profile__info-piece">{userData.user.email}</p>
              <div className="profile__info-wrap">
                <p className="profile__label"> BIO</p>
                <p className="profile__info-piece">
                  {userData.user.bio ||
                    "Please write something about yourself to share with the rest of the users and make new friends faster"}
                </p>
              </div>
            </div>
          </div>

          <div className="profile__links">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "profile__link profile__link--active"
                  : "profile__link"
              }
              to="/profile/friends"
            >
              FRIENDS
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "profile__link profile__link--active"
                  : "profile__link"
              }
              to="/profile/events"
            >
              EVENTS
            </NavLink>
          </div>

          <Outlet />

          <Link to="/" className="profile__log-link">
            <p className="profile__logout" onClick={handleLogout}>
              Log out
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
