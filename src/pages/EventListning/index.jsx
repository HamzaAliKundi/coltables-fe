import React from 'react'
import EventListing from '../../common/EventListening/EventListing';
import Advertisment from '../../common/Ad/Advertisment';
import Footer from '../Footer';

const EventListingPage = () => {
  return (
    <div style={{
        backgroundImage: 'url(/events/bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <EventListing isEvent={true} />
        <Advertisment />
        <Footer />
      </div>
  )
}

export default EventListingPage
