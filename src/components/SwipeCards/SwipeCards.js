import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SwipeCards.scss";
import swipeDirection from "../../assets/icons/swipeDirection.svg";

const SwipeCards = ({ profiles, BACKEND_URL }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const isFriend = async (profileId) => {
    await axios.put(`${BACKEND_URL}/api/profiles/${profileId}`, {
      isSwiped: 1,
      isFriend: 1,
    });
    const authToken = sessionStorage.getItem("authToken");
    await axios.post(`${BACKEND_URL}/api/users/friends/${profileId}`, null, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });
  };

  const saveFriend = async (profileId) => {
    const authToken = sessionStorage.getItem("authToken");

    const { data: existingFriendship } = await axios.get(
      `${BACKEND_URL}/api/users/friends/${profileId}`,
      {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      }
    );

    if (existingFriendship) {
      console.log("The user is already a friend");
      return;
    }
  };

  const notFriend = async (profileId) => {
    await axios.put(`${BACKEND_URL}/api/profiles/${profileId}`, {
      isSwiped: 1,
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = (profileId) => {
    if (!isDragging) return;

    setIsDragging(false);
    setTranslateX(0);

    if (translateX > 100) {
      // Swiped right
      setCurrentIndex((prevIndex) => prevIndex + 1);

      try {
        isFriend(profileId);
        saveFriend(profileId);
        console.log("right swipe");
      } catch (error) {
        console.log(error);
      }
    } else if (translateX < -100) {
      // Swiped left
      setCurrentIndex((prevIndex) => prevIndex + 1);

      try {
        notFriend(profileId);
        console.log("left");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //=====No more profiles - add a notice on the page======
  const nextIndex = currentIndex + 1;
  if (nextIndex >= profiles.length) {
    // Handle end of profiles
    console.log("No more profiles");
    return;
  }

  const handleClick = (direction, profileId) => {
    const nextIndex = currentIndex + 1;
    const screenWidth = window.innerWidth;
    const swipeDistance = direction === "right" ? screenWidth : -screenWidth;

    setTranslateX(swipeDistance);
    if (direction === "right") {
      // Wait for the animation to finish
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setTranslateX(0);
      }, 300); // Adjust animation duration as needed

      try {
        isFriend(profileId);
        saveFriend(profileId);
        console.log("right swipe");
      } catch (error) {
        console.log(error);
      }
    } else if (direction === "left") {
      // Wait for the animation to finish
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setTranslateX(0);
      }, 300); // Adjust animation duration as needed
    }

    try {
      notFriend(profileId);
      console.log("left");
    } catch (error) {
      console.log(error);
    }
  };

  const renderProfile = (index) => {
    const profile = profiles[index];

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      });
    };

    const startDate = profile && formatDate(profile.start_date);
    const endDate = profile && formatDate(profile.end_date);

    return (
      <>
        <img
          src={swipeDirection}
          className="card__arrow card__arrow--left"
          onClick={() => {
            handleClick("left", profile.id);
          }}
        />

        {profile && (
          <Link to={`/profiles/${profile.id}`} className=" card__link">
            <div
              className={`card ${index === currentIndex ? "card--active" : ""}`}
              style={{ transform: `translateX(${translateX}px)` }}
              key={profile.id}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => {
                handleTouchEnd(profile.id);
              }}
            >
              <img src={profile.avatar} alt="avatar" className="card__avatar" />
              <div className="card__info">
                <h3 className="card__name">{profile.name}</h3>
                <h3 className="card__age">{profile.age}</h3>
              </div>
              <div className="card__location-info">
                <p className="card__location">{profile.location}</p>
                <p className="card__dates">
                  {startDate} - {endDate}
                </p>
              </div>
            </div>
          </Link>
        )}


        <img
          src={swipeDirection}
          className="card__arrow card__arrow--right"
          onClick={() => {
            handleClick("right", profile.id);
          }}
        />


      </>
    );
  };

  return <div className="swipe-cards">{renderProfile(currentIndex)}</div>;
};

export default SwipeCards;
