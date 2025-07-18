import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Venues from "./pages/venues";
import Performers from "./pages/Performer";
import VenueProfilePage from "./pages/VenuesProfile";
import EventListingPage from "./pages/EventListning";
import CreateEventPage from "./pages/CreateEvent/index";
import PerformerProfilePage from "./pages/PerformerProfile/index";
import Privacy from "./components/privacy";
import Terms from "./components/terms";
import CalendarPage from "./pages/calendar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import EventDetailPage from "./pages/EventDetail";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <div className="bg-black">
        <Navbar onSearch={handleSearch} />
      </div>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues searchQuery={searchQuery} />} />
        <Route
          path="/performers"
          element={<Performers searchQuery={searchQuery} />}
        />
        <Route path="/events" element={<EventListingPage searchQuery={searchQuery} />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/event-detail/:id" element={<EventDetailPage />} />

        <Route path="/venue-profile/:id" element={<VenueProfilePage />} />
        <Route
          path="/performer-profile/:id"
          element={<PerformerProfilePage />}
        />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
