import React from 'react'
import Banner from '../../components/Home/Banner';
import WhoWeAre from '../../components/Home/WhoWeAre';
import Singers from '../../components/Home/Singers';
import Advertisment from '../Advertisment';

const Home = () => {
  return (
    <div>
      <Banner />
      <Advertisment />
      <Singers />
      <WhoWeAre />
    </div>
  )
}

export default Home
