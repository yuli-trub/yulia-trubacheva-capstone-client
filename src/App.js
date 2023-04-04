import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="/profile/events" element={<UserEvents />} />
          <Route path="/profile/friends" element={<UserFriends />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
