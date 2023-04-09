import "./Friend.scss";

const Friend = ({ friend, modalHandler }) => {
  return (
    <>
      <div
        className="friend__wrap"
        onClick={() => {
          modalHandler(friend.id);
        }}
      >
        <img src={friend.avatar_url} alt="avatar" className="friend__img" />

        <p className="friend__name">{friend.name}</p>
        {/* <p className="friend__location">{friend.location}</p> */}
      </div>
    </>
  );
};

export default Friend;
