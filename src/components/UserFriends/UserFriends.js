import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import Friend from "../Friend/Friend";
import "./UserFriends.scss";
import { Link } from "react-router-dom";

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
    window.scrollTo(0, 0);
  };

  if (!savedFriends) {
    return <p>Loading</p>;
  }
  console.log(savedFriends);
  return (
    <>
      <div className="friends">
        {savedFriends.length === 0 && <p className="">No friends</p>}
        {savedFriends &&
          savedFriends.map((friend) => {
            return (
              <Link to={`/profiles/${friend.id}`} className="friends__link">
                <Friend friend={friend} modalHandler={modalHandler} />{" "}
              </Link>
            );
          })}
      </div>
      {/* {friendModalShown && (
        <ProfileModal
          BACKEND_URL={BACKEND_URL}
          profile={selectedFriend}
          setFriendModalShown={setFriendModalShown}
        />
      )} */}
    </>
  );
};

export default UserFriends;
