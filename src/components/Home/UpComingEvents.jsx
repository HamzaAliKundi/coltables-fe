import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const UpComingEvents = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);

  const events = [
    {
      id: 1,
      image: "/home/upcomping/upcoming.png",
      date: "26",
      month: "FEB",
      title: "Rachel's Rpdr Watch Party",
      host: "Hosted By rachel Bitchface",
      time: "Start 06:45pm-22:00pm",
      location: "Club Pause",
      featured: true,
    },
    {
      id: 2,
      image: "/home/upcomping/upcoming.png",
      date: "26",
      month: "FEB",
      title: "Rachel's Rpdr Watch Party",
      host: "Hosted By rachel Bitchface",
      time: "Start 06:45pm-22:00pm",
      location: "Club Pause",
      featured: true,
    },
    {
      id: 3,
      image: "/home/upcomping/upcoming.png",
      date: "28",
      month: "FEB",
      title: "Rachel's Rpdr Watch Party",
      host: "Hosted By rachel Bitchface",
      time: "Start 06:45pm-22:00pm",
      location: "Club Pause",
      featured: true,
    },
    {
      id: 4,
      image: "/home/upcomping/upcoming.png",
      date: "2",
      month: "MAR",
      title: "Rachel's Rpdr Watch Party",
      host: "Hosted By rachel Bitchface",
      time: "Start 06:45pm-22:00pm",
      location: "Club Pause",
      featured: false,
    },
  ];

  const scrollTo = (index) => {
    setActiveSlide(index);
    if (containerRef.current) {
      const scrollPosition = index * (containerRef.current.offsetWidth / 3);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-12 px-4 md:px-8 text-white">
      {/* Background Pattern - Using CSS pattern for now */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,0,162,0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <h2 className="font-['Space_Grotesk'] font-normal text-lg leading-none text-center align-middle uppercase">
              UPCOMING EVENTS
            </h2>
          </div>

          <div className="flex flex-col items-end w-full">
            <Link
              to="/events"
              className="font-['Space_Grotesk'] text-[#FF00A2] text-base mb-2"
            >
              VIEW ALL
            </Link>
            <Link to="/calendar" className="w-[51px] h-[51px] rounded-full flex items-center justify-center">
              <img src="/home/eventlisting/calendar.png" alt="Calendar" />
            </Link>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none text-center align-middle capitalize mb-10">
          Don't Miss These Upcoming Events!
        </h1>

        {/* Cards Container */}
        <div className="relative overflow-hidden">
          {/* Cards Scrollable Area */}
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto hide-scrollbar py-4 px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`flex-shrink-0 w-[320px] md:w-[567px] h-[381px] relative ${
                  activeSlide === index ? "z-10" : "opacity-80"
                }`}
              >
                {/* Event Card */}
                <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                  {/* Image */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Pink vertical accent line */}
                  <div className="absolute top-0 left-0 bottom-0 w-[6px] bg-[#FF00A2]"></div>

                  {/* Date Badge */}
                  <div className="absolute top-[13px] left-[16px] bg-[#FF00A2] rounded-full w-[66px] h-[66px] flex flex-col items-center justify-center">
                    <span className="font-['Space_Grotesk'] font-bold text-2xl">
                      {event.date}
                    </span>
                    <span className="font-['Space_Grotesk'] text-sm uppercase">
                      {event.month}
                    </span>
                  </div>

                  {/* Card Content - semi-transparent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
                    {/* Content container positioned in the middle-right - MODIFIED SIZE */}
                    <div className="absolute bg-black/60 top-24 md:top-28 right-4 md:right-12 rounded-lg bottom-4 md:bottom-8 left-20 md:left-32 p-3 md:p-5 backdrop-blur">
                      <img
                        src="/home/upcomping/crown.png"
                        alt="crown"
                        className="absolute -right-4 -top-4 md:-top-7 w-[24px] h-[24px] md:w-[36px] md:h-[36px]"
                      />
                      <h3 className="font-['Space_Grotesk'] font-bold text-base md:text-2xl mb-1 text-white">
                        {event.title}
                      </h3>
                      <p className="font-['Space_Grotesk'] text-xs md:text-base mb-1 md:mb-4 text-white">
                        {event.host}
                      </p>

                      <div className="flex items-center mb-1 md:mb-2">
                        <span className="text-[#FF00A2] mr-1 md:mr-2 text-sm md:text-lg">
                          ⏰
                        </span>
                        <span className="font-['Space_Grotesk'] text-xs md:text-sm text-white">
                          {event.time}
                        </span>
                      </div>

                      <div className="flex items-center mb-2 md:mb-6">
                        <span className="text-[#FF00A2] mr-1 md:mr-2 text-sm md:text-lg">
                          📍
                        </span>
                        <span className="font-['Space_Grotesk'] text-xs md:text-sm text-white">
                          {event.location}
                        </span>
                      </div>

                      {/* Card Actions */}
                      <div className="flex mt-auto space-x-1 md:space-x-2">
                        <Link to={`/events/${event.id}`}>
                          <button className="w-[80px] md:w-[120px] h-[28px] md:h-[40px] bg-[#FF00A2] border-[#FF00A2] border-2 rounded-l-full text-white font-['Space_Grotesk'] text-[10px] md:text-sm uppercase hover:bg-pink-600 transition">
                            VIEW DETAILS
                          </button>
                        </Link>

                        <Link to="/events">
                          <button className="w-[80px] md:w-[120px] h-[28px] md:h-[40px] border-2 border-[#FF00A2] rounded-r-full text-[#FF00A2] font-['Space_Grotesk'] text-[10px] md:text-sm uppercase hover:bg-pink-600 hover:text-white transition">
                            VIEW ALL
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-[10px] h-[10px] rounded-full ${
                activeSlide === index ? "bg-[#FF00A2]" : "bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UpComingEvents;
