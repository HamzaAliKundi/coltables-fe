import React, { useEffect, useRef, useState } from "react";
import { useGetSingleEventByIdQuery } from "../../apis/events";
import { Link, useParams } from "react-router-dom";
import { useGetPerformersQuery } from "../../apis/performers";
import {
  CalendarCheck,
  Crown,
  User,
  ChevronDown,
  ChevronsDown,
  ChevronsRight,
  ChevronUp,
} from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();

  const { data: getEventsByVenuesById, isLoading: getEventLoading } =
    useGetSingleEventByIdQuery(id);
  const [showMore, setShowMore] = useState(false);
  const [showMoreHosts, setShowMoreHosts] = useState(false);

  const { data: getPerformers } = useGetPerformersQuery();

  const performers = getEventsByVenuesById?.event?.performersList || [];
  const performer = getEventsByVenuesById?.event?.user || null;
  const hosts = Array.isArray(getEventsByVenuesById?.event?.host) 
    ? getEventsByVenuesById.event.host 
    : getEventsByVenuesById?.event?.host 
      ? [getEventsByVenuesById.event.host] 
      : [];

  const [isPerformersVisible, setIsPerformersVisible] = useState(false);

  const dropdownRef = useRef(null);
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPerformersVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePerformersVisibility = () => {
    setIsPerformersVisible(!isPerformersVisible);
  };

  // Helper function to get timezone-safe date
  const getTimezoneSafeDate = (dateString) => {
    let date = new Date(dateString);
    if (
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0
    ) {
      const localDate = new Date(date);
      const localDay = localDate.getDate();
      const utcDay = date.getUTCDate();
      if (localDay < utcDay) {
        localDate.setDate(localDate.getDate() + 1);
        date = localDate;
      }
    }
    return date;
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

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
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

  const formatEventType = (type) => {
    const types = {
      "drag-show": "Drag Show",
      "drag-brunch": "Drag Brunch",
      "drag-bingo": "Drag Bingo",
      "drag-trivia": "Drag Trivia",
      other: "Other",
    };
    return types[type] || "Other";
  };

  if (getEventLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-12">
        <div className="w-8 h-8 border-2 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-8 md:pt-16 px-4">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center w-full max-w-[1200px]">
        <div className="p-2 relative w-full lg:w-auto">
          <img
            src={
              getEventsByVenuesById?.event?.image || "/events/event-1.jpg.svg"
            }
            alt="event"
            className="w-[500px] h-[500px] object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3 w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-gradient-to-b from-[#FF00A2] to-[#D876B5] rounded-full flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-[#e3d4de] leading-none">
              {String(
                getTimezoneSafeDate(
                  getEventsByVenuesById?.event?.startDate
                ).getDate()
              ).padStart(2, "0")}
            </span>
            <span className="text-base md:text-lg font-semibold text-[#ebd4e3] uppercase leading-none">
              {getTimezoneSafeDate(getEventsByVenuesById?.event?.startDate)
                .toLocaleDateString("en-US", { month: "short" })
                .slice(0, 3)}
            </span>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="mb-6 lg:mb-8 mt-4 lg:mt-12">
            <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-base md:text-lg lg:text-xl text-center">
              {getEventsByVenuesById?.event?.title}
            </h2>

            <div className="flex flex-col gap-4 md:gap-6">
              {/* 1st row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-1 w-full">
                  <div className="flex items-start gap-2 md:w-[50%]">
                    <CalendarCheck size={22} color="#FF00A2" />
                    <div className="flex flex-col relative">
                      Start Date:{" "}
                      {formatDate(getEventsByVenuesById?.event?.startDate)}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:w-[50%]">
                    <img
                      src="/events/Background-3.png"
                      alt="bullet"
                      className="w-5 h-5 mt-1"
                    />

                    <div className="flex flex-col">
                      Start Time:{" "}
                      {extractTime(getEventsByVenuesById?.event?.startTime)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2nd row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-1 w-full">
                  <div className="flex items-start gap-2 md:w-[50%]">
                    <User size={22} color="#FF00A2" className="mt-1" />
                    <div className="flex flex-col relative" ref={dropdownRef}>
                      <div className="flex flex-col flex-1">
                        <div className={`flex gap-2 ${showMoreHosts ? 'flex-col' : 'flex-wrap'}`}>
                          {hosts.length > 0 ? (
                            hosts
                              .slice(0, showMoreHosts ? hosts.length : 2)
                              .map((host, index) => (
                                <span key={index} className="inline-block">
                                  {host}
                                </span>
                              ))
                          ) : (
                            <span>N/A</span>
                          )}
                        </div>

                        {hosts.length > 2 && (
                          <button
                            onClick={() => setShowMoreHosts(!showMoreHosts)}
                            className="text-[#D876B5] text-sm underline mt-1 self-start"
                          >
                            {showMoreHosts ? "Show less" : "Show more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:w-[50%]">
                    {performers.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        <Crown size={18} color="#FF00A2" />
                      </div>
                    )}
                    
                    <div className="flex flex-col flex-1">
                      <div
                        className={`flex gap-2 ${showMore ? 'flex-col' : 'flex-wrap'}`}
                      >
                        {performers.length > 0 ? (
                          <div className="flex flex-col items-start">
                            {performers
                              .slice(0, showMore ? performers.length : 2)
                              .map((performer) =>
                                performer?.fullDragName && (
                                  <Link
                                    key={performer._id}
                                    to={`/performer-profile/${performer._id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="inline-block hover:underline"
                                  >
                                    {performer.fullDragName}
                                  </Link>
                                )
                            )}
                          </div>
                        ) : performer?.userType === "performer" ? (
                          <div className="flex items-center gap-2">
                            <Crown size={22} color="#FF00A2" />
                            {performer?.fullDragName && (
                              <Link
                                key={performer?._id}
                                to={`/performer-profile/${performer?._id}`}
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:underline"
                              >
                                {performer?.fullDragName}
                              </Link>
                            )}
                          </div>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>

                      {performers.length > 2 && (
                        <button
                          onClick={() => setShowMore(!showMore)}
                          className="text-[#D876B5] text-sm underline mt-1 self-start"
                        >
                          {showMore ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3rd row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-1 w-full">
                  <div className="flex items-start gap-2 md:w-[50%]">
                    <img
                      src="/events/Background-2.png"
                      alt="bullet"
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex flex-col relative flex-1 min-w-0">
                      {getEventsByVenuesById?.event?.userType !== "venue" && (
                        <span>
                          {getEventsByVenuesById?.event?.address || "N/A"}
                        </span>
                      )}

                      {getEventsByVenuesById?.event?.userType === "venue" && (
                        <Link
                          to={`/venue-profile/${getEventsByVenuesById?.event?.user?._id}`}
                        >
                          <span>
                            {getEventsByVenuesById?.event?.user?.name || "N/A"}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:w-[50%]">
                    <img
                      src="/events/Background-4.png"
                      alt="bullet"
                      className="w-5 h-5 mt-1"
                    />

                    <div className="flex flex-col">
                      {formatEventType(getEventsByVenuesById?.event?.type)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4th Row */}

              <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-0 text-base md:text-lg lg:text-xl text-center">
                About Event
              </h2>
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <p className="text-white">
                  {getEventsByVenuesById?.event?.description
                    ? getEventsByVenuesById.event.description
                        .split("\n")
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            {index <
                              getEventsByVenuesById.event.description.split(
                                "\n"
                              ).length -
                                1 && <br />}
                          </span>
                        ))
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
