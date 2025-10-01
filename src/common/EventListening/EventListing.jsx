import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import { useGetAllEventsQuery } from "../../apis/events";
import { cityOptions } from "../../utils/citiesList";


// Group and sort events by UTC date and startTime (for display order only)
function groupAndSortEvents(events) {
  // Group by UTC date string (YYYY-MM-DD)
  const groups = {};
  events.forEach(event => {
    const date = new Date(event.startDate);
    const dateKey = date.getUTCFullYear() + '-' +
      String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
      String(date.getUTCDate()).padStart(2, '0');
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(event);
  });

  // Sort each group by startTime
  Object.values(groups).forEach(group => {
    group.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  });

  // Flatten back to a single array, preserving date order
  return Object.keys(groups)
    .sort() // sort by dateKey
    .flatMap(dateKey => groups[dateKey]);
}

const EventListing = ({ isEvent, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;
  const [activeTab, setActiveTab] = useState("all");
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState({
    label: "Filter by",
    value: "",
  });
  const dropdownRef = useRef(null);

  const {
    data: allEventsData,
    isLoading: allEventsLoading,
    isFetching,
  } = useGetAllEventsQuery(
    {
      page: currentPage,
      limit: eventsPerPage,
      ...(activeTab !== "all" && {
        type: activeTab === "other" ? "other" : activeTab,
      }),
      address: debouncedSearchTerm,
      search: searchQuery || "",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const tabs = [
    { value: "all", label: "All Events" },
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
    if (tabValue === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(tabValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!isFetching) {
      setIsTabLoading(false);
    }
  }, [isFetching]);

  const filteredOptions = cityOptions.filter(
    (option) =>
      searchTerm === "" ||
      option.value === "" ||
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const formatDate = (dateString) => {
    let date = new Date(dateString);
    // If the UTC time is midnight, and the local time is the previous day, adjust
    if (
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0
    ) {
      // If the local date is before the UTC date, add a day
      const localDate = new Date(date);
      const localDay = localDate.getDate();
      const utcDay = date.getUTCDate();
      if (localDay < utcDay) {
        localDate.setDate(localDate.getDate() + 1);
        date = localDate;
      }
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const extractTime = (dateString) => {
    let date = new Date(dateString);
    // If the UTC time is midnight, and the local time is the previous day, adjust
    if (
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0
    ) {
      // If the local date is before the UTC date, add a day
      const localDate = new Date(date);
      const localDay = localDate.getDate();
      const utcDay = date.getUTCDate();
      if (localDay < utcDay) {
        localDate.setDate(localDate.getDate() + 1);
        date = localDate;
      }
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  // New function to get the actual event date by combining startDate and startTime
  const getActualEventDate = (event) => {
    // Create a new date from startDate
    const eventDate = new Date(event.startDate);
    
    // Get the time components from startTime (LOCAL time)
    const startTime = new Date(event.startTime);
    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    const seconds = startTime.getSeconds();
    
    // Set the time on the event date (LOCAL time)
    eventDate.setHours(hours, minutes, seconds, 0);
    
    return eventDate;
  };

  // New function to format the actual event date
  const formatActualEventDate = (event) => {
    const actualDate = getActualEventDate(event);
    return actualDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // New function to extract actual event time
  const extractActualEventTime = (event) => {
    const actualDate = getActualEventDate(event);
    
    let hours = actualDate.getHours();
    let minutes = actualDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  // Function to format the event date in the user's local timezone using startTime
  const formatEventLocalDate = (event) => {
    const date = new Date(event.startTime);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to format the event time using sortDateTime (which correctly combines date and time)
  const formatEventLocalTime = (event) => {
    const date = new Date(event.sortDateTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Always show the date as entered (UTC, not shifted to local)
  const formatEventAdminDate = (event) => {
    const date = new Date(event.startDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC", // Force UTC so it never shifts
    });
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
        <Link to="/calendar">
          <img
            src="/home/eventlisting/calendar.png"
            alt="calendar"
            className="w-[51px] h-[51px]"
          />
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Tabs Container */}
          <div className="w-full md:flex-grow overflow-x-auto scrollbar-hide pb-2">
            <div className="flex space-x-4 sm:space-x-6 min-w-max md:min-w-0 md:justify-center">
              {tabs.map((tab) => (
                <div
                  key={tab.value}
                  className="relative cursor-pointer flex flex-col items-center px-1"
                  onClick={() => handleTabChange(tab.value)}
                >
                  <div className="flex items-center mb-2">
                    {/* {tab.value === "all" && (
                      <img
                        src="/home/eventlisting/all-events.png"
                        alt="All Events"
                        className="w-6 h-6 mr-2"
                      />
                    )} */}
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
                      className={`font-['Space_Grotesk'] font-normal text-sm sm:text-[18px] capitalize ${
                        activeTab === tab.value
                          ? "text-[#FF00A2]"
                          : "text-white"
                      } truncate max-w-[100px] sm:max-w-none`}
                    >
                      {tab.label}
                    </span>
                  </div>
                  {activeTab === tab.value && (
                    <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] max-w-[117px]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dropdown Container */}
          {location.pathname === "/events" && (
            <div className="flex justify-end relative" ref={dropdownRef}>
              <div className="p-2 border rounded-lg border-[#FF00A2]">
                <input
                  type="text"
                  placeholder="Search cities..."
                  className="w-[130px] bg-transparent text-white placeholder-[#FF00A2] focus:outline-none font-['Space_Grotesk']"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <div
              className="min-w-[121px] h-[35px] rounded-[8px] border border-[#FF00A2] p-2 flex items-center justify-between cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="font-['Space_Grotesk'] font-normal text-sm sm:text-[16px] leading-[100%] text-white truncate max-w-[80px] sm:max-w-[100px]">
                {selectedOption.label}
              </span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isOpen && (
              <div className="absolute top-full right-0 mt-1 w-full sm:w-[200px] bg-[#1E1E1E] rounded-[8px] border border-[#FF00A2] shadow-lg z-10">
                <div className="p-2 border-b border-[#FF00A2]">
                  <input
                    type="text"
                    placeholder="Search cities..."
                    className="w-full bg-transparent text-white placeholder-[#FF00A2] focus:outline-none font-['Space_Grotesk']"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF00A2] scrollbar-track-[#1E1E1E]">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <div
                        key={option.value}
                        className="px-3 py-2 hover:bg-[#FF00A2] hover:bg-opacity-20 cursor-pointer font-['Space_Grotesk'] text-white"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-white font-['Space_Grotesk'] text-center">
                      No cities found
                    </div>
                  )}
                </div>
              </div>
            )} */}
            </div>
          )}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allEventsLoading || isTabLoading || isSearching ? (
          <div className="col-span-full flex mt-16 justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : allEventsData?.docs?.length > 0 ? (
          groupAndSortEvents(allEventsData.docs).map((event) => (
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
                <div className="absolute top-3 left-3 w-[70px] h-[70px] bg-gradient-to-b from-[#FF00A2] to-[#D876B5] rounded-full flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#e3d4de] leading-none">
                    {formatEventAdminDate(event)?.replace(",", "").slice(3, 6)}
                  </span>
                  <span className="text-lg font-semibold text-[#ebd4e3] uppercase leading-none">
                    {formatEventAdminDate(event)?.slice(0, 3)}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-5">
                <h3 className="font-['Space_Grotesk'] font-bold text-[24px] leading-[100%] capitalize text-white mb-6">
                  {event.title.length > 20 ? `${event.title.substring(0, 20)}...` : event.title}
                </h3>
                <div className="flex items-center mb-4 text-gray-300">
                  <img
                    src="/home/eventlisting/time.png"
                    alt="Time"
                    className="mr-2 w-4 h-4"
                  />
                  <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%]">
                    Starts: {formatEventLocalTime(event)}
                  </span>
                </div>

                <div className="flex items-center mb-8 text-gray-300">
                  <img
                    src="/home/eventlisting/location.png"
                    alt="Location"
                    className="mr-2 w-4 h-4"
                  />
                  <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%]">
                    {event?.userType !== "venue" && (
                      <span className="truncate">
                        {event?.address?.length > 20 
                          ? `${event.address.substring(0, 20)}...` 
                          : event?.address || "N/A"}
                      </span>
                    )}

                    {event?.userType === "venue" && (
                      <span className="truncate">
                        {event?.user?.name || "N/A"}
                      </span>
                    )}
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
              {searchQuery
                ? `No events found for "${searchQuery}"`
                : "No events found in this category"}
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
