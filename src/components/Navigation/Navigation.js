import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/explore">EXPLORE</Link>
      <Link to="/events">EVENTS</Link>
      <Link to="/profile">PROFILE</Link>
      <Link to="/about">ABOUT</Link>
      <Link to="/chats">chats</Link>
    </div>
  );
};

export default Navigation;
