import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Chat = ({ socket, selectedChatId, currentUser }) => {
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

  return (
    <>
      <div>
        <div className="chat__header">Chat with someone</div>
        <div className="chat__body">
          {msgList.map((message) => {
            return (
              <div className="message">
                <div className="message__content">
                  <p>{message.message}</p>
                </div>
                <div className="message__meta">
                  <p className="message__time">{message.time}</p>
                  <p className="message__author">{message.author}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat__footer">
          <input
            type="text"
            placeholder="hey message"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>send</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
