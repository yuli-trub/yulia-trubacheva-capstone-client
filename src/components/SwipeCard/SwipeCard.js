import axios from "axios";
import "./SwipeCard.scss";
import TinderCard from "react-tinder-card";

const SwipeCard = ({
  profile,
  BACKEND_URL,
  getProfiles,
  setProfilesModified,
}) => {
  const onSwipe = (direction, profileId) => {
    console.log(profileId);

    if (direction === "left") {
      console.log("left");
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
      } catch (error) {
        console.log(error);
      }
    } else if (direction === "right") {
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
    }
  };

  return (
    <TinderCard
      className="react-tinder-card"
      onSwipe={(direction) => onSwipe(direction, profile.id)}
    >
      <div className="card">{profile.name}</div>
    </TinderCard>
  );
};
export default SwipeCard;
