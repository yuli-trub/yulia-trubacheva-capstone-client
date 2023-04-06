import axios from "axios";

const ProfileModal = ({ profile, BACKEND_URL }) => {
  const profileId = profile.id;

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
        `${BACKEND_URL}/api/Profiles/${profile.id}`,
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

  return (
    <div className="profile__wrap">
      <h2 className="profile__title">{profile.name}</h2>
      <p className="profile__description">{profile.description}</p>
      <p className="profile__date">{profile.date}</p>
      <p className="profile__delete" onClick={deleteFriend}>
        unfriend
      </p>
    </div>
  );
};

export default ProfileModal;
