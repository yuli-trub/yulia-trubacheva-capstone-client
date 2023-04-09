import axios from "axios";
import "./ProfileModal.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SavedEvent from "../SavedEvent/SavedEvent";

const ProfileModal = ({ profile, BACKEND_URL, setFriendModalShown }) => {
  const profileId = profile.id;
  const [fullProfile, setFullProfile] = useState(null);

  const getFullProfile = async () => {
    const { data } = await axios.get(
      `${BACKEND_URL}/api/profiles/${profileId}`
    );
    setFullProfile(data);
  };
  useEffect(() => {
    try {
      getFullProfile();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const deleteFriend = async () => {
    const deleteUserFriend = async () => {
      const authToken = sessionStorage.getItem("authToken");
      console.log(authToken);
      await axios.delete(`${BACKEND_URL}/api/users/profiles/${profileId}`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });
    };

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/profiles/${profile.id}`,
        {
          isFriend: 0,
        }
      );
      console.log(data);
      deleteUserFriend();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(-1);
    setFriendModalShown(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };
  console.log(fullProfile);

  return (
    <>
      {fullProfile && (
        <section className="profile-modal">
          <div className="profile-modal__navigate">
            <p onClick={navigateHandler}>back</p>
          </div>
          <div className="profile-modal__img">
            <img
              src={fullProfile.avatar}
              alt="avatar"
              className="profile-modal__avatar"
            />
          </div>
          <div className="profile-modal__info">
            <div className="profile-modal__top">
              <h2 className="profile-modal__title">{fullProfile.name}</h2>
              <p className="profile-modal__age">{fullProfile.age}</p>
            </div>
            <p className="profile-modal__location">{fullProfile.location}</p>
            <p className="profile-modal__description">
              {fullProfile.description}
            </p>
            <p className="profile-modal__date">
              {formatDate(fullProfile.start_date)} -{" "}
              {formatDate(fullProfile.end_date)}
            </p>
            <p className="profile-modal__bio">{fullProfile.bio}</p>

            <ul className="profile-modal__interests">
              {fullProfile.interests.map((interest) => {
                return (
                  <li
                    key={interest.interest_id}
                    className="profile-modal__interest"
                  >
                    #{interest.interest_name}
                  </li>
                );
              })}
            </ul>

            <div className="profile-modal__events">
              <h3 className="profile-modal__headline">EVENTS</h3>
              <ul className="profile-modal__event">
                {fullProfile.events.map((event) => {
                  <Link
                    to={`/events/${event.id}`}
                    className="saved-events__link"
                  >
                    <SavedEvent event={event} />
                  </Link>;
                })}
              </ul>
            </div>

            {fullProfile.isFriend ? (
              <p className="profile-modal__delete" onClick={deleteFriend}>
                unfriend
              </p>
            ) : (
              ""
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileModal;
