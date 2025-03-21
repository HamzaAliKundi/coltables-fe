import React from 'react'
import Banner from '../../components/Home/Banner';
import WhoWeAre from '../../components/Home/WhoWeAre';
import Singers from '../../components/Home/Singers';
import Advertisment from '../Advertisment';
import EventListing from '../../components/Home/EventListing';
import Performer from '../../components/Home/Performer';
import UpComingEvents from '../../components/Home/UpComingEvents';

const Home = () => {
  return (
    <div>
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
