import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import Performers from './pages/Performer'
import EventListingPage from './pages/EventListning'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/performers" element={<Performers />} />
        <Route path="/events" element={<EventListingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
