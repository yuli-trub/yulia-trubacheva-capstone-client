// import { useState, useEffect } from "react";
// const ChatPage = ({ socket }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   return (
//     <div>
//       <h1>Chat</h1>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//       <form onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatPage;
