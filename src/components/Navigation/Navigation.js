import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import explore from "../../assets/icons/explore.svg";

const Navigation = () => {
  return (
    <div className="nav-menu">
      <NavLink className="nav-menu__item" to="/explore">
        <img src={explore} alt="Explore" className="nac-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/events">
        <img src={explore} alt="Events" className="nac-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/profile">
        <img src={explore} alt="Chat" className="nac-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/">
        <img src={explore} alt="Profile" className="nac-menu__icon" />
      </NavLink>
      <NavLink className="nav-menu__item" to="/chats">
        <img src={explore} alt="About" className="nac-menu__icon" />
      </NavLink>
    </div>
  );
};

export default Navigation;
