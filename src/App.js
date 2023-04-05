import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventModal from "./components/EventModal/EventModal";

function App() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
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
          path="/profile"
          element={<ProfilePage BACKEND_URL={BACKEND_URL} />}
        >
          {/* <Route path="/profile/events" element={<UserEvents />} />
          <Route path="/profile/friends" element={<UserFriends />} /> */}
        </Route>

        <Route
          path="/explore"
          element={<ExplorePage BACKEND_URL={BACKEND_URL} />}
        />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route
          path="/events"
          element={<EventsPage BACKEND_URL={BACKEND_URL} />}
        />
        <Route path="/events/:id" element={<EventModal />} />
        {/* {/* <Footer /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
