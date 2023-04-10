import axios from "axios";
import "./ProfileModal.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SavedEvent from "../SavedEvent/SavedEvent";
import unfriend from "../../assets/icons/delete.svg";
import message from "../../assets/icons/message.svg";
import back from "../../assets/icons/back.svg";

const ProfileModal = ({ BACKEND_URL }) => {
  const { profileId } = useParams();
  const [fullProfile, setFullProfile] = useState(null);

  //GET FULL PROFILE
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

  //DELETE FRIEND
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
        `${BACKEND_URL}/api/profiles/${profileId}`,
        {
          isFriend: 0,
        }
      );
      console.log(data);
      deleteUserFriend();
      getFullProfile();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  //NAVIGATION
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <>
      {fullProfile && (
        <section className="profile-modal">
          <div className="profile-modal__navigate">
            <img
              src={back}
              alt="back"
              className="profile-modal__arrow"
              onClick={navigateHandler}
            ></img>
          </div>
          <div className="profile-modal__img">
            <img
              src={fullProfile.avatar}
              alt="avatar"
              className="profile-modal__avatar"
            />
          </div>
          <div className="profile-modal__info">
            <div className="profile-modal__top-wrap">
              <div className="profile-modal__top">
                <h2 className="profile-modal__title">{fullProfile.name}</h2>
                <p className="profile-modal__age">{fullProfile.age}</p>
              </div>
              <div className="profile-modal__loc">
                <p className="profile-modal__location">
                  {fullProfile.location}
                </p>
                <p className="profile-modal__date">
                  {formatDate(fullProfile.start_date)} -{" "}
                  {formatDate(fullProfile.end_date)}
                </p>
              </div>
            </div>
            <p className="profile-modal__bio">{fullProfile.bio}</p>
          </div>
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

          {fullProfile.isFriend ? (
            <div className="profile-modal__events">
              <h3 className="profile-modal__headline">EVENTS</h3>
              <ul className="profile-modal__event-list">
                {fullProfile.events.map((event) => {
                  return (
                    <Link
                      to={`/events/${event.id}`}
                      className="saved-events__link"
                    >
                      <SavedEvent event={event} />
                    </Link>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
          {fullProfile.isFriend ? (
            <>
              <div className="profile-modal__action profile-modal__action--delete">
                <img
                  src={unfriend}
                  onClick={deleteFriend}
                  alt="unfriend"
                  className="profile-modal__delete"
                />
              </div>
              <Link
                to={`/chat/${profileId}`}
                className="profile-modal__action profile-modal__action--message"
              >
                <img
                  src={message}
                  alt="message"
                  className="profile-modal__message"
                />
              </Link>
            </>
          ) : (
            ""
          )}
        </section>
      )}
    </>
  );
};

export default ProfileModal;
