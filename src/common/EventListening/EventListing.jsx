import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useGetAllEventsQuery } from "../../apis/events";

const EventListing = ({ isEvent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = isEvent ? 10 : 8;
  const [activeTab, setActiveTab] = useState("drag-show");

  const { data: allEventsData, isLoading: allEventsLoading } = useGetAllEventsQuery({
    page: currentPage,
    limit: eventsPerPage,
    type: activeTab === "other" ? "other" : activeTab
  });

  const tabs = [
    { value: "drag-show", label: "Drag Show" },
    { value: "drag-brunch", label: "Drag Brunch" },
    { value: "drag-bingo", label: "Drag Bingo" },
    { value: "drag-trivia", label: "Drag Trivia" },
    { value: "other", label: "Other" },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const extractTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-gradient-to-b text-white py- px-4 md:px-8 pt-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-[105px] h-[6px] bg-[#FF00A2] rounded-[10px]"></div>
        </div>
        {/* <Link
          to="/events"
          className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] align-middle text-[#FF00A2]"
        >
          VIEW ALL
        </Link> */}
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div>
          <h2 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none uppercase mb-2">
            EVENT LISTING
          </h2>
        </div>

        {/* Calendar Icon */}
        {/* <Link to="/create-event">
          <img
            src="/home/eventlisting/calendar.png"
            alt="calendar"
            className="w-[51px] h-[51px]"
          />
        </Link> */}
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto mb-8 overflow-x-auto">
        <div className="flex justify-center space-x-6 min-w-max">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className="relative cursor-pointer flex flex-col items-center"
              onClick={() => handleTabChange(tab.value)}
            >
              <div className="flex items-center mb-2">
                {tab.value === "drag-show" && (
                  <img
                    src="/home/eventlisting/drag-show.png"
                    alt="Drag Show"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab.value === "drag-brunch" && (
                  <img
                    src="/home/eventlisting/drag-brunch.png"
                    alt="Drag Brunch"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab.value === "drag-bingo" && (
                  <img
                    src="/home/eventlisting/drag-bingo.png"
                    alt="Drag Bingo"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab.value === "drag-trivia" && (
                  <img
                    src="/home/eventlisting/drag-trive.png"
                    alt="Drag Trivia"
                    className="w-6 h-6 mr-2"
                  />
                )}
                {tab.value === "other" && (
                  <img
                    src="/home/eventlisting/other-event.png"
                    alt="Other Event"
                    className="w-6 h-6 mr-2"
                  />
                )}
                <span
                  className={`font-['Space_Grotesk'] font-normal text-[18px] capitalize ${
                    activeTab === tab.value ? "text-[#FF00A2]" : "text-white"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
              {activeTab === tab.value && (
                <div className="w-[117px] h-[3px] bg-[#FF00A2] rounded-[5px]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allEventsLoading ? (
          <div className="col-span-full flex mt-16 justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : allEventsData?.docs?.length > 0 ? (
          allEventsData.docs.map((event) => (
            <div
              key={event._id}
              className="bg-[#1a1a1a] p-3 rounded-[8px] overflow-hidden h-[475px] relative"
            >
              <div className="p-2 relative">
                <img
                  src={event.image}
                  alt="Event"
                  className="w-full h-[220px] rounded-[8px] object-cover"
                />
                {/* <div className="absolute top-3 left-3 w-[70px] h-[70px] bg-gradient-to-b from-[#FF00A2] to-[#D876B5] rounded-full flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#e3d4de] leading-none">
                  {formatDate(event.startDate)?.replace(',', '').slice(3, 6)}
                  </span>
                  <span className="text-lg font-semibold text-[#ebd4e3] uppercase leading-none">
                    {formatDate(event.startDate)?.slice(0, 3)}
                  </span>
                </div> */}
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
                    Starts: {extractTime(event.startTime)}
                  </span>
                </div>

                <div className="flex items-center mb-8 text-gray-300">
                  <img
                    src="/home/eventlisting/location.png"
                    alt="Location"
                    className="mr-2 w-4 h-4"
                  />
                  <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%]">
                    {event?.host || "N/A"}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="absolute bottom-5 left-0 w-full px-5">
                  <Link
                    to={`/event-detail/${event._id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <button className="w-full h-[51px] bg-[#FF00A2] rounded-[30px] font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase text-white hover:bg-pink-600 transition">
                      VIEW DETAILS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-white text-xl">
              No events found in this category
            </p>
          </div>
        )}
      </div>

      {isEvent && allEventsData?.totalPages > 1 && (
        <div className="flex justify-center w-full mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={allEventsData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default EventListing;
