import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.scss";
import send from "../../assets/icons/send.svg";
import back from "../../assets/icons/back.svg";

const Chat = ({ socket, selectedChatId, currentUser, setShowChat }) => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [msgList, setMsgList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage) {
      const msgData = {
        room: selectedChatId,
        author: currentUser,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_msg", msgData);
      setMsgList((list) => [...list, msgData]);
    }
  };

  useEffect(() => {
    socket.on("receive_mgs", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  const navigate = useNavigate();

  return (
    <>
      <section className="chat">
        <div className="chat__wrap">
          <div className="chat__header">
            <img
              src={back}
              alt="back"
              className="chat__back"
              onClick={() => {
                navigate(-1);
                setShowChat(false);
              }}
            />

            <h2 className="chat__title">Chat</h2>
          </div>
          <div className="chat__body">
            {msgList.map((message) => {
              return (
                <article className="message" key={message.time}>
                  <div className="message__content">
                    <p className="message__text">{message.message}</p>
                  </div>
                  <div className="message__meta">
                    <p className="message__time">{message.time}</p>
                    <p className="message__author">{currentUser.avatar_url}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="chat__footer">
            <input
              type="text"
              className="chat__input"
              placeholder="Type the message"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button className="chat__btn" onClick={sendMessage}>
              <img src={send} alt="send" className="chat__icon" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
