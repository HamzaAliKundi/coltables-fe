import React from 'react'
import WhoWeAre from '../../components/Home/WhoWeAre';
import Singers from '../../components/Home/Singers';
import Advertisment from '../../common/Ad/Advertisment';
import EventListing from '../../components/Home/EventListing';
import Performer from '../../components/Home/Performer';
import UpComingEvents from '../../components/Home/UpComingEvents';
import Banner from '../../common/Banner/Banner';

const Home = () => {
  return (
    <div style={{
      backgroundImage: 'url(/home/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <Banner />
      <UpComingEvents />
      <Performer />
      <EventListing />
      <Advertisment />
      <Singers />
      <WhoWeAre />
    </div>
  );
}

export default Home
