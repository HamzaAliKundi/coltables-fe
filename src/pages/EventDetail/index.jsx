import React from "react";
import Advertisment from "../../common/Ad/Advertisment";
import Footer from "../Footer";
import EventDetail from "../../components/eventDetail/EventDetail";

const EventDetailPage = () => {
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
      <EventDetail />
      <Advertisment />
      <Footer />
    </div>
  );
};

export default EventDetailPage;
