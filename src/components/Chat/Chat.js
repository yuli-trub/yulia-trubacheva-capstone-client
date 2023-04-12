import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.scss";
import send from "../../assets/icons/send.svg";
import back from "../../assets/icons/back.svg";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ socket, selectedChatId, currentUser, setShowChat }) => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [msgList, setMsgList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage) {
      const msgData = {
        room: 1,
        id: uuidv4(),
        author: currentUser,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_msg", msgData);

      if (msgData.author === currentUser) {
        setMsgList((list) => [...list, msgData]);
      }
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      if (data.author !== currentUser) {
        setMsgList((list) => {
          if (list.some((msg) => msg.id === data.id)) {
            return list;
          }
          return [...list, data];
        });
      }
    });
  }, [socket, currentUser]);

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
            {msgList &&
              msgList.map((message) => {
                return (
                  <article className="message" key={message.id}>
                    <div
                      className={`message__content ${
                        message.author === currentUser
                          ? "message__content--current"
                          : "message__content--other"
                      }`}
                    >
                      <p className="message__text">{message.message}</p>
                    </div>
                    <div className="message__meta">
                      <p
                        className={`message__time ${
                          message.author === currentUser
                            ? "message__time--current"
                            : "message__time--other"
                        }`}
                      >
                        {message.time}
                      </p>
                      {/* <p
                        className={`message__time ${
                          message.author === currentUser
                            ? "message__time--current"
                            : "message__time--other"
                        }`}
                      >
                        {message.author === currentUser
                          ? "You"
                          : message.author}
                      </p> */}
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
