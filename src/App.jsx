import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Venues from './pages/venues'
import Footer from './pages/Footer'
import Performers from './pages/Performer'
import EventListingPage from './pages/EventListning'
import CreateEventPage from './pages/CreateEvent/index'
import PerformerProfilePage from './pages/PerformerProfile/index'

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
        <Route path="/performer-profile/:id" element={<PerformerProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
