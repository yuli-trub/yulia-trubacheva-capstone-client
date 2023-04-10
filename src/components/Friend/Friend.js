import { Link } from "react-router-dom";
import "./Friend.scss";

const Friend = ({ friend }) => {
  return (
    <>
      <Link to={`/profiles/${friend.id}`} className="friend__link">
        <div className="friend__wrap">
          <img src={friend.avatar_url} alt="avatar" className="friend__img" />
          <p className="friend__name">{friend.name}</p>
        </div>
      </Link>
    </>
  );
};

export default Friend;
