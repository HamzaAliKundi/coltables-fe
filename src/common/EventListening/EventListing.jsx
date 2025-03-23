import React, { useState } from "react";
import { FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import Pagination from './Pagination';

const EventListing = ({ isEvent }) => {
  const [activeTab, setActiveTab] = useState("Drag Show");

  const tabs = [
    "Drag Show",
    "Drag Brunch",
    "Drag Bingo",
    "Drag Trivia",
    "Other Event",
  ];

  const events = [
    {
      id: 1,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Sunday Service Drag Brunch",
      time: "Start 11AM, 1PM, 3PM",
      location: "The Montrose Country Club, Houston",
      badge: "2/2",
    },
    {
      id: 2,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Showgirls",
      time: "Start 8:00 PM",
      location: "The Montrose Country Club, Houston",
    },
    {
      id: 3,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "So You Think You Can Drag?",
      time: "Start11:00 PM",
      location: "South Beach, Houston",
    },
    {
      id: 4,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Brunch On The Rooftop",
      time: "Start 2:00 PM",
      location: "Lustre Pearl, Houston",
    },
    {
      id: 5,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Millennial Dolls",
      time: "Start 11:00PM",
      location: "South Beach, Houston",
    },
    {
      id: 6,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Angels",
      time: "Start 11:00 PM",
      location: "JR's Bar and Grill, Houston",
    },
    {
      id: 7,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Sunday Service Drag Brunch",
      time: "Start 11AM, 1PM, 3PM",
      location: "The Montrose Country Club, Houston",
      badge: "2/2",
    },
    {
      id: 8,
      image: "/home/eventlisting/event.png",
      date: "26",
      month: "FEB",
      title: "Millennial Dolls",
      time: "Start 11:00PM",
      location: "South Beach, Houston",
    },
  ];

  return (
    <div className="bg-gradient-to-b text-white py- px-4 md:px-8 pt-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-[105px] h-[6px] bg-pink-500 rounded-[10px]"></div>
        </div>
        <Link
          to="/events"
          className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] align-middle text-[#FF00A2]"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div>
          <h2 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none uppercase mb-2">
            EVENT LISTING
          </h2>
        </div>

        {/* Calendar Icon */}
        <Link to="/events">
          <img
            src="/home/eventlisting/calendar.png"
            alt="calendar"
            className="w-[51px] h-[51px]"
          />
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto mb-8 overflow-x-auto">
        <div className="flex justify-center space-x-6 min-w-max">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="relative cursor-pointer flex flex-col items-center"
              onClick={() => setActiveTab(tab)}
            >
              <div className="flex items-center mb-2">
                {tab === "Drag Show" && (
                  <img
                    src="/home/eventlisting/drag-show.png"
                    alt="Drag Show"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab === "Drag Brunch" && (
                  <img
                    src="/home/eventlisting/drag-brunch.png"
                    alt="Drag Brunch"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab === "Drag Bingo" && (
                  <img
                    src="/home/eventlisting/drag-bingo.png"
                    alt="Drag Bingo"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab === "Drag Trivia" && (
                  <img
                    src="/home/eventlisting/drag-trive.png"
                    alt="Drag Trivia"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab === "Other Event" && (
                  <img
                    src="/home/eventlisting/other-event.png"
                    alt="Other Event"
                    className="w-6 h-6 mr-2"
                  />
                )}
                <span
                  className={`font-['Space_Grotesk'] font-normal text-[18px] capitalize ${
                    activeTab === tab ? "text-pink-500" : "text-white"
                  }`}
                >
                  {tab}
                </span>
              </div>
              {activeTab === tab && (
                <div className="w-[117px] h-[3px] bg-pink-500 rounded-[5px]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="max-w-7xl  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#1a1a1a] p-3 rounded-[8px] overflow-hidden h-[544px] relative"
          >
            {/* Event Image */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[282px] md:w-[282px] object-cover rounded-lg"
              />

              {/* Date Badge */}
              <div className="absolute top-4 left-4 w-[66px] h-[66px] bg-pink-500 rounded-full flex flex-col items-center justify-center text-white">
                <span className="font-['Space_Grotesk'] font-bold text-[24px] leading-tight">
                  {event.date}
                </span>
                <span className="font-['Space_Grotesk'] text-[14px] uppercase">
                  {event.month}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-5">
              <h3 className="font-['Space_Grotesk'] font-bold text-[24px] leading-[100%] capitalize text-white mb-6">
                {event.title}
              </h3>
              <div className="flex items-center mb-4 text-gray-300">
                <img
                  src="/home/eventlisting/time.png"
                  alt="Time"
                  className="mr-2 w-4 h-4"
                />
                <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%]">
                  {event.time}
                </span>
              </div>

              <div className="flex items-center mb-8 text-gray-300">
                <img
                  src="/home/eventlisting/location.png"
                  alt="Location"
                  className="mr-2 w-4 h-4"
                />
                <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%]">
                  {event.location}
                </span>
              </div>

              {/* View Details Button */}
              <div className="absolute bottom-5 left-0 w-full px-5">
                <button className="w-full h-[51px] bg-[#FF00A2] rounded-[30px] font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase text-white hover:bg-pink-600 transition">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isEvent && (
        <div className="flex justify-center w-full mt-8">
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default EventListing;
