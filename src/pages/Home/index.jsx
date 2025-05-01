import React from "react";
import WhoWeAre from "../../components/Home/WhoWeAre";
import Singers from "../../components/Home/Singers";
import Advertisment from "../../common/Ad/Advertisment";
import EventListing from "../../common/EventListening/EventListing";
import UpComingEvents from "../../components/Home/UpComingEvents";
import Banner from "../../common/Banner/Banner";
import Footer from "../Footer";
import PerformerSlider from "../../components/Home/PerformerSlider";

const Home = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Banner />
      <UpComingEvents />
      <PerformerSlider />
      <EventListing />
      <Advertisment />
      <Singers />
      <WhoWeAre />
      <Footer isHome={true} />
    </div>
  );
};

export default Home;
