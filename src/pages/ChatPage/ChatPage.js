import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "../../components/Chat/Chat";

const ChatPage = ({ socket, BACKEND_URL }) => {
  const [savedFriends, setSavedFriends] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    setSavedFriends(uniqueFriends);
    setCurrentUser(data.user.name);
  };

  useEffect(() => {
    try {
      getSavedFriends();
      console.log(selectedChatId);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = (friendId) => {
    setSelectedChatId(friendId);
    socket.emit("join_room", selectedChatId);
    setShowChat(true);
  };

  // Loading
  if (!savedFriends) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {!showChat ? (
        <>
          (<h3 className="chats__header">Your chats</h3>
          <ul className="chats__list">
            {savedFriends &&
              savedFriends.map((friend) => {
                return (
                  <li
                    className="chats__item"
                    onClick={() => handleClick(friend.id)}
                  >
                    {friend.name}
                  </li>
                );
              })}
          </ul>
          )
        </>
      ) : (
        <Chat
          socket={socket}
          selectedChatId={selectedChatId}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default ChatPage;
