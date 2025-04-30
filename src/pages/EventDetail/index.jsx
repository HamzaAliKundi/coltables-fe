import React from "react";
import Advertisment from "../../common/Ad/Advertisment";
import Footer from "../Footer";
import EventDetail from "../../components/eventDetail/EventDetail";

const EventDetailPage = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/events/bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <EventDetail />
      <Advertisment />
      <Footer />
    </div>
  );
};

export default EventDetailPage;
