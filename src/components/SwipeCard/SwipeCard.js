import axios from "axios";
import "./SwipeCard.scss";
import TinderCard from "react-tinder-card";
import { Link } from "react-router-dom";

const SwipeCard = ({ profile, BACKEND_URL }) => {
  const onSwipe = (direction, profileId) => {
    if (direction === "left") {
      const notFriend = async () => {
        await axios.put(`${BACKEND_URL}/api/profiles/${profileId}`, {
          isSwiped: 1,
        });
      };

      try {
        notFriend();
      } catch (error) {
        console.log(error);
      }
    } else if (direction === "right") {
      const isFriend = async () => {
        await axios.put(`${BACKEND_URL}/api/profiles/${profileId}`, {
          isSwiped: 1,
          isFriend: 1,
        });
        const authToken = sessionStorage.getItem("authToken");
        await axios.post(
          `${BACKEND_URL}/api/users/friends/${profileId}`,
          null,
          {
            headers: {
              authorisation: `Bearer ${authToken}`,
            },
          }
        );
      };

      const saveFriend = async () => {
        const authToken = sessionStorage.getItem("authToken");

        const { data: existingFriendship } = await axios.get(
          `${BACKEND_URL}/api/users/friends/${profileId}`,
          {
            headers: {
              authorisation: `Bearer ${authToken}`,
            },
          }
        );

        if (existingFriendship) {
          console.log("The user is already a friend");
          return;
        }
      };

      try {
        isFriend();
        saveFriend();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };

  const startDate = formatDate(profile.start_date);
  const endDate = formatDate(profile.end_date);
  return (
    <>
      <TinderCard
        className="react-tinder-card"
        onSwipe={(direction) => onSwipe(direction, profile.id)}
      >
        {/* <Link to={`/profiles/${profile.id}`} className="card__link"> */}
        <div className="card">
          <img src={profile.avatar} alt="avatar" className="card__avatar" />
          <div className="card__info">
            <h3 className="card__name">{profile.name}</h3>
            <h3 className="card__age">{profile.age}</h3>
          </div>
          <div className="card__location-info">
            <p className="card__location">{profile.location}</p>
            <p className="card__dates">
              {startDate} - {endDate}
            </p>
          </div>
        </div>{" "}
        {/* </Link>{" "} */}
      </TinderCard>
      {/* <p
        className="card__arrow card__arrow--left"
        onClick={() => {
          onSwipe("left", profile.id);
        }}
      >
        left
      </p>
      <p
        className="card__arrow card__arrow--right"
        onClick={() => {
          onSwipe("right", profile.id);
        }}
      >
        right
      </p> */}
    </>
  );
};
export default SwipeCard;
