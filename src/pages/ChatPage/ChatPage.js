import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "../../components/Chat/Chat";
import { Link } from "react-router-dom";
import "./ChatPage.scss";

const ChatPage = ({ socket, BACKEND_URL, isLoggedIn }) => {
  const [savedFriends, setSavedFriends] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      {/* {!savedFriends && !isLoggedIn && (
        <div className="profile__auth">
          <h3 className="profile__warn">Not signed in</h3>
          <Link to="/login" className="profile__signin">
            <button className="profile__button">Sign in</button>
          </Link>
        </div>
      )} */}
      {/* 
      {isLoggedIn && ( */}
      <>
        <div className="chats__wrap">
          <h3 className="chats__header">Messages</h3>
          <ul className="chats__list">
            {savedFriends &&
              savedFriends.map((friend) => {
                return (
                  <Link
                    to={`/chats/${friend.id}`}
                    className="chats__link"
                    key={friend.id}
                  >
                    <li
                      className="friend"
                      onClick={() => handleClick(friend.id)}
                    >
                      <div className="friend__img-wrap">
                        <img
                          src={friend.avatar_url}
                          alt="Friend avatar"
                          className="friend__img"
                        />
                      </div>
                      <div className="friend__info-wrap">
                        <h3 className="friend__name">{friend.name}</h3>
                        <p className="friend__fake-msg">
                          Hey! How are you doing?
                        </p>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
        {showChat && (
          <Chat
            socket={socket}
            selectedChatId={selectedChatId}
            currentUser={currentUser}
            setShowChat={setShowChat}
          />
        )}
      </>
      {/* )} */}
    </>
  );
};

export default ChatPage;
