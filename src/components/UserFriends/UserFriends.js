import axios from "axios";
import React, { useEffect, useState } from "react";
import Friend from "../Friend/Friend";
import "./UserFriends.scss";

const UserFriends = ({ BACKEND_URL }) => {
  const [savedFriends, setSavedFriends] = useState(null);

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

  if (!savedFriends) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="friends">
        {savedFriends.length === 0 && (
          <p className="">No friends to display yet</p>
        )}
        {savedFriends &&
          savedFriends.map((friend) => {
            return <Friend friend={friend} key={friend.id} />;
          })}
      </div>
    </>
  );
};

export default UserFriends;
