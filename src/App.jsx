import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Venues from './pages/venues'
import Performers from './pages/Performer'
import VenueProfilePage from './pages/VenuesProfile'
import EventListingPage from './pages/EventListning'
import CreateEventPage from './pages/CreateEvent/index'
import PerformerProfilePage from './pages/PerformerProfile/index'
import Privacy from './components/privacy'
import Terms from './components/terms'
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/performers" element={<Performers />} />
        <Route path="/events" element={<EventListingPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/venue-profile/:id" element={<VenueProfilePage />} />
        <Route path="/performer-profile/:id" element={<PerformerProfilePage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
