import React from 'react'
import EventListing from '../../common/EventListening/EventListing';
import Advertisment from '../../common/Ad/Advertisment';
import Footer from '../Footer';

const EventListingPage = () => {
  return (
    <div  className="min-h-screen w-full"
    style={{
      background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
        <EventListing isEvent={true} />
        <Advertisment />
        <Footer />
      </div>
  )
}

export default EventListingPage
