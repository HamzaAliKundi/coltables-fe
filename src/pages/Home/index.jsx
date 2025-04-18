import React from 'react'
import WhoWeAre from '../../components/Home/WhoWeAre';
import Singers from '../../components/Home/Singers';
import Advertisment from '../../common/Ad/Advertisment';
import EventListing from '../../common/EventListening/EventListing';
import Performer from '../../components/Home/Performer';
import UpComingEvents from '../../components/Home/UpComingEvents';
import Banner from '../../common/Banner/Banner';
import Footer from '../Footer';

const Home = () => {
  return (
    <div style={{
      backgroundImage: 'url(/home/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <Banner />
      <UpComingEvents />
      <Performer />
      <EventListing  />
      <Advertisment />
      <Singers />
      <WhoWeAre />
      <Footer isHome={true} />
    </div>
  );
}

export default Home
