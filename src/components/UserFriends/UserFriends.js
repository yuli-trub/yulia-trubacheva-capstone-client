import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";

const UserFriends = ({ BACKEND_URL }) => {
  const [savedFriends, setSavedFriends] = useState(null);
  const [friendModalShown, setFriendModalShown] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const getSavedFriends = async () => {
    const authToken = sessionStorage.getItem("authToken");

    const { data } = await axios.get(`${BACKEND_URL}/api/users/profile`, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });
    const uniqueFriends = [
      ...new Set(data.friends.map((friend) => friend.id)),
    ].map((id) => data.friends.find((f) => f.id === id));
    console.log(uniqueFriends);
    setSavedFriends(uniqueFriends);
  };

  useEffect(() => {
    try {
      getSavedFriends();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Modal

  const modalHandler = (eventId) => {
    setFriendModalShown(true);
    const chosenFriend = savedFriends.find((event) => event.id === eventId);
    setSelectedFriend(chosenFriend);
  };

  if (!savedFriends) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="friends">
        {savedFriends.map((friend) => {
          return (
            <p
              className="friend__name"
              onClick={() => {
                modalHandler(friend.id);
              }}
            >
              {friend.name}
            </p>
          );
        })}
      </div>
      {friendModalShown && (
        <ProfileModal BACKEND_URL={BACKEND_URL} profile={selectedFriend} />
      )}
    </>
  );
};

export default UserFriends;
