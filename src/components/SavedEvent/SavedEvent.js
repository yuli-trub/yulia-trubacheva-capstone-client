import { useParams } from "react-router-dom";
import "./SavedEvent.scss";

const SavedEvent = ({ event, modalHandler }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };
  return (
    <article
      className="saved-event"
      onClick={() => {
        modalHandler(event.id);
      }}
    >
      <div className="saved-event__img-wrap">
        {/* <img src={event.image} alt="Event image" className="saved-event__img" /> */}
      </div>
      <div className="saved-event__info-wrap">
        <h3 className="saved-event__name">{event.name}</h3>
        <div className="saved-event__bottom-wrap">
          <p className="saved-event__location">{event.location}</p>
          <p className="saved-event__date">{formatDate(event.date)}</p>
        </div>
      </div>
    </article>
  );
};

export default SavedEvent;
