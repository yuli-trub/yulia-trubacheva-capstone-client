import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import explore from "../../assets/icons/explore.svg";
import message from "../../assets/icons/message.svg";
import home from "../../assets/icons/home.svg";
import profile from "../../assets/icons/profile.svg";
import wonder from "../../assets/icons/wonder.svg";

const Navigation = () => {
  return (
    <div className="nav-menu">
      <NavLink className="nav-menu__item" to="/">
        <img src={home} alt="Profile" className="nav-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/events">
        <img src={explore} alt="Events" className="nav-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/explore">
        <img src={wonder} alt="Profile" className="nav-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/profile">
        <img src={profile} alt="Chat" className="nav-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/chats">
        <img src={message} alt="About" className="nav-menu__icon" />
      </NavLink>
    </div>
  );
};

export default Navigation;
