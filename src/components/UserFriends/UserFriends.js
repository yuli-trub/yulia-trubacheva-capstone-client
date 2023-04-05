import axios from "axios";
import React, { useEffect, useState } from "react";

const UserFriends = ({ BACKEND_URL }) => {
  const [savedFriends, setSavedFriends] = useState(null);

  const getSavedFriends = async () => {
    const { data } = await axios(`${BACKEND_URL}/api/profiles/`);
    const userFriends = data.filter((profile) => profile.isFriend === 1);
    setSavedFriends(userFriends);
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
    <div className="friends">
      {savedFriends.map((friend) => {
        return <p className="friend__name">{friend.name}</p>;
      })}
    </div>
  );
};

export default UserFriends;
