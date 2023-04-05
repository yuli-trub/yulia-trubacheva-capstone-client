import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ExplorePage from "./pages/ExplorePage/ExplorePage";

function App() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ExplorePage BACKEND_URL={BACKEND_URL} />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="/profile/events" element={<UserEvents />} />
          <Route path="/profile/friends" element={<UserFriends />} /> */}
        {/* </Route> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
