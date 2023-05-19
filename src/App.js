import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventModal from "./components/EventModal/EventModal";
import SavedEvents from "./components/SavedEvents/SavedEvents";
import UserFriends from "./components/UserFriends/UserFriends";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import ChatPage from "./pages/ChatPage/ChatPage";
import ProfileModal from "./components/ProfileModal/ProfileModal";

import "./App.scss";

import io from "socket.io-client";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const socket = io.connect("http://localhost:8081", {
  transports: ["websocket"],
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    console.log("logged out");
  };

  return (
    <BrowserRouter>
      <Header handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route
          path="/chats"
          element={
            <ChatPage
              socket={socket}
              BACKEND_URL={BACKEND_URL}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/chats/:id"
          element={
            <ChatPage
              socket={socket}
              BACKEND_URL={BACKEND_URL}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterForm
              setIsRegistered={setIsRegistered}
              BACKEND_URL={BACKEND_URL}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              setIsLoggedIn={setIsLoggedIn}
              BACKEND_URL={BACKEND_URL}
            />
          }
        />
        <Route
          path="/events/:eventId"
          element={<EventModal BACKEND_URL={BACKEND_URL} />}
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              BACKEND_URL={BACKEND_URL}
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          }
        >
          <Route
            path="/profile/events"
            element={<SavedEvents BACKEND_URL={BACKEND_URL} />}
          />
          <Route
            path="/profile/friends"
            element={<UserFriends BACKEND_URL={BACKEND_URL} />}
          />
        </Route>
        <Route
          path="/profiles/:profileId"
          element={<ProfileModal BACKEND_URL={BACKEND_URL} />}
        />

        <Route
          path="/explore"
          element={<ExplorePage BACKEND_URL={BACKEND_URL} isLoggedIn={isLoggedIn}
         />}
        />
        <Route
          path="/events"
          element={<EventsPage BACKEND_URL={BACKEND_URL} isLoggedIn={isLoggedIn}/>}
        />
        <Route path="/events/:id" element={<EventModal />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
