import React, { useState } from "react";
import Reviews from "./Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleVenueByIdQuery } from "../../apis/venues";
import { Youtube } from "lucide-react";
import Gallery from "../PerformerProfile/Gallery";
import { useGetCalendarEventsQuery } from "../../apis/events";
import { useGetAllAdsQuery } from "../../apis/adsBanner";
import { useGetPerformersQuery } from "../../apis/performers";

const VenuesProfile = () => {
  const [isMonthView, setIsMonthView] = useState(true);
  const [isDayView, setIsDayView] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  const { data: ad } = useGetAllAdsQuery("venue");
  const { data: getPerformers } = useGetPerformersQuery();
  console.log(getPerformers);


  const { id } = useParams();
  const { data: venueDetail, isLoading: venueDetailLoading } =
    useGetSingleVenueByIdQuery(id);

  const { data: calendarEvents } = useGetCalendarEventsQuery(
    {
      view: isMonthView || (!isMonthView && !isDayView) ? "month" : "day",
      fromDate: isDayView
        ? `${selectedDay.getFullYear()}-${String(
            selectedDay.getMonth() + 1
          ).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}`
        : isMonthView
        ? `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}`
        : `${selectedWeekStart.getFullYear()}-${String(
            selectedWeekStart.getMonth() + 1
          ).padStart(2, "0")}`,
      userId: id,
      userType: "venue",
    },
    {
      skip: false,
    }
  );

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    // Create array of empty cells for days before the first day of the month
    const emptyCells = Array(firstDay).fill(null);
    
    // Create array of current month's days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Combine empty cells and current month days
    return [...emptyCells, ...currentMonthDays];
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handlePrevWeek = () => {
    const newDate = new Date(selectedWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeekStart(newDate);
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDay(clickedDate);
  };

  const handleBackToMonthOrWeek = () => {
    setIsDayView(false);
    setIsMonthView(true); // Default back to month view
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const formatWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  const formatDay = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone,
    });
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: userTimeZone,
    });
  };

  function getLocalDateKey(event) {
    const date = new Date(event.startDate);
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
        return localDate.toLocaleDateString();
      }
    }
    // Otherwise, just use the local date
    return date.toLocaleDateString();
  }

  // Group all events by local date in the user's timezone
  const groupEventsByLocalDate = (calendarEvents) => {
    const grouped = {};
    if (!calendarEvents?.eventDates) return grouped;
    Object.values(calendarEvents.eventDates).forEach((monthObj) => {
      Object.entries(monthObj).forEach(([day, dayObj]) => {
        dayObj.eventDetails.forEach((event) => {
          const localDateKey = getLocalDateKey(event);
          if (!grouped[localDateKey]) grouped[localDateKey] = [];
          grouped[localDateKey].push(event);
        });
      });
    });
    return grouped;
  };

  // Use this for calendar dots and event display
  const groupedEventsByLocalDate = groupEventsByLocalDate(calendarEvents);

  const getEventsForDay = (day) => {
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const localDateKey = dateObj.toLocaleDateString();
    return groupedEventsByLocalDate[localDateKey] || [];
  };

  const renderEventDots = (day, isCurrentWeek = false) => {
    const events = getEventsForDay(day);
    if (!events || events.length === 0) return null;

    return (
      <div className="absolute bottom-1 lg:bottom-2 flex gap-0.5 lg:gap-1">
        {events.slice(0, 3).map((_, i) => (
          <div
            key={i}
            className={`w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full ${
              !isMonthView || isCurrentWeek ? "bg-white" : "bg-[#FF00A2]"
            }`}
          ></div>
        ))}
        {events.length > 3 && (
          <div className="text-[8px] text-white">+{events.length - 3}</div>
        )}
      </div>
    );
  };

  const getEventsForDisplay = () => {
    if (!calendarEvents?.eventDates) return [];
    let events = [];

    if (isDayView && selectedDay) {
      // When a day is selected, show only that day's events
      const monthKey = `${selectedDay.getFullYear()}-${String(
        selectedDay.getMonth() + 1
      ).padStart(2, "0")}`;
      const dayStr = String(selectedDay.getDate()).padStart(2, "0");
      events = calendarEvents.eventDates[monthKey]?.[dayStr]?.eventDetails || [];
    } else if (isMonthView) {
      // In month view, show all events for the current month
      const monthKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthEvents = calendarEvents.eventDates[monthKey] || {};
      events = Object.values(monthEvents).flatMap(
        (day) => day.eventDetails || []
      );
    } else {
      // In week view, filter events for the selected week from month data
      const monthKey = `${selectedWeekStart.getFullYear()}-${String(
        selectedWeekStart.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthEvents = calendarEvents.eventDates[monthKey] || {};

      // Get the week range
      const weekStart =
        selectedWeekStart.getDate() - selectedWeekStart.getDay();
      const weekEnd = weekStart + 6;

      // Filter events for days in the week range
      const weekEvents = [];
      Object.entries(monthEvents).forEach(([day, data]) => {
        const dayNum = parseInt(day);
        if (dayNum >= weekStart && dayNum <= weekEnd) {
          weekEvents.push(...(data.eventDetails || []));
        }
      });

      events = weekEvents;
    }
    
    // Sort events by date first, then by local time-of-day (same approach as EventListing)
    const sortedEvents = [...events].sort((a, b) => {
      // First, sort by date (using startDate)
      const dateA = a.startDate ? a.startDate.split('T')[0] : '';
      const dateB = b.startDate ? b.startDate.split('T')[0] : '';
      
      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }
      
      // If dates are the same, sort by local time-of-day
      // Convert sortDateTime to local time and extract time-of-day
      if (a.sortDateTime && b.sortDateTime) {
        const dateA_obj = new Date(a.sortDateTime);
        const dateB_obj = new Date(b.sortDateTime);
        
        // Get local time-of-day in minutes since midnight
        const localMinutesA = dateA_obj.getHours() * 60 + dateA_obj.getMinutes();
        const localMinutesB = dateB_obj.getHours() * 60 + dateB_obj.getMinutes();
        
        return localMinutesA - localMinutesB;
      }
      
      // Fallback: combine startDate and startTime
      const timeA = a.startTime ? a.startTime.split('T')[1] : '';
      const timeB = b.startTime ? b.startTime.split('T')[1] : '';
      const fullA = dateA + 'T' + (timeA || '00:00:00.000Z');
      const fullB = dateB + 'T' + (timeB || '00:00:00.000Z');
      
      const fallbackDateA = new Date(fullA);
      const fallbackDateB = new Date(fullB);
      const fallbackMinutesA = fallbackDateA.getHours() * 60 + fallbackDateA.getMinutes();
      const fallbackMinutesB = fallbackDateB.getHours() * 60 + fallbackDateB.getMinutes();
      
      return fallbackMinutesA - fallbackMinutesB;
    });

    return sortedEvents;
  };

  const handleViewChange = (isMonth) => {
    setIsMonthView(isMonth);
    setIsDayView(false);
    setSelectedDay(null);
  };

  const formatFacility = (facility) => {
    switch (facility) {
      case "stage-size":
        return "Stage Size & Type";
      case "seating":
        return "Seating Arrangements";
      case "sound-lighting":
        return "Sound & Lighting Equipment (Available In-House Or Need To Rent)";
      case "backstage":
        return "Backstage & Dressing Rooms";
      case "food-beverages":
        return "Food & Beverages";
      case "parking":
        return "Parking Availability";
      case "others":
        return "Others";
      default:
        return facility.charAt(0).toUpperCase() + facility.slice(1);
    }
  };

  function formatTimeRange(timeString) {
    if (!timeString) return "";
    if (timeString.toLowerCase() === "24 hrs") return "Open 24 hours";

    return timeString
      .split(" - ")
      .map((time) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
      })
      .join(" - ");
  }

  const formatVenueType = (venueType) => {
    switch (venueType) {
      case "bar/club":
        return "Bar/Club";
      case "restaurant/dining":
        return "Restaurant/Dining";
      case "other":
        return "OTHER";
      default:
        return venueType?.toUpperCase() || "OTHER";
    }
  };

  return (
    <div className="min-h-screen text-white p-4 lg:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left Section - Profile Info */}
        <div className="col-span-1 lg:col-span-8">
          {venueDetailLoading ? (
            <div className="flex mt-16 justify-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <h1 className="font-['Bebas_Neue'] text-[64px] font-bold mb-4 lg:mb-8 text-center">
                {venueDetail?.venue?.name}
              </h1>

              {/* Profile Image and Social Links */}
              <div className="relative flex justify-center">
                <img
                  src={venueDetail?.venue?.logo}
                  alt={venueDetail?.venue?.name}
                  className="w-full max-w-[550px] h-auto mx-auto"
                />

                {/* Social Media Links */}
                <div className="flex flex-col gap-3 lg:gap-4 absolute right-0 top-0">
                  {venueDetail?.venue?.socialMediaLinks?.facebook && (
                    <a
                      href={venueDetail.venue.socialMediaLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[46px] h-[46px] lg:w-12 lg:h-12 rounded-full flex items-center justify-center"
                    >
                      <img
                        src="/performer-profile/facebook.svg"
                        alt="Facebook"
                        className="w-[46px] h-[46px] lg:w-[46] lg:h-[46]"
                      />
                    </a>
                  )}

                  {venueDetail?.venue?.socialMediaLinks?.instagram && (
                    <a
                      href={venueDetail.venue.socialMediaLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] rounded-full flex items-center justify-center"
                    >
                      <img
                        src="/performer-profile/instagram.svg"
                        alt="Instagram"
                        className="w-[46px] h-[46px] lg:w-[46] lg:h-[46]"
                      />
                    </a>
                  )}

                  {venueDetail?.venue?.socialMediaLinks?.twitter && (
                    <a
                      href={venueDetail.venue.socialMediaLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
                    >
                      <img
                        src="/performer-profile/x.svg"
                        alt="Twitter"
                        className="w-[46px] h-[46px] lg:w-12 lg:h-12"
                      />
                    </a>
                  )}

                  {venueDetail?.venue?.socialMediaLinks?.tiktok && (
                    <a
                      href={venueDetail.venue.socialMediaLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
                    >
                      <img
                        src="/performer-profile/tiktok.svg"
                        alt="TikTok"
                        className="w-[46px] h-[46px] lg:w-12 lg:h-12"
                      />
                    </a>
                  )}

                  {venueDetail?.venue?.socialMediaLinks?.youtube && (
                    <a
                      href={venueDetail.venue.socialMediaLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
                    >
                      <Youtube size={50} color="red" />
                    </a>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="mb-6 lg:mb-8 mt-12">
                <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-[20px] font-space-grotesk font-bold leading-none capitalize text-center">
                  About {venueDetail?.venue?.name}
                </h2>
                <p 
                  className="text-white/90 text-sm lg:text-base"
                  dangerouslySetInnerHTML={{ __html: venueDetail?.venue?.description?.replace(/\n/g, '<br />') }}
                />
              </div>

              {/* Sections Grid */}
              <div className="space-y-6 lg:space-y-8">
                {/* Performers Section */}
                {venueDetail?.venue?.topDragPerformers?.[0] && (
                  <div>
                    <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize border-b-[3px] border-[#FF00A2] pb-1">
                      Which Performers May You Find Here?
                    </h3>
                    <ul className="list-disc list-inside grid grid-cols-2 gap-y-2 text-white/90">
                      {venueDetail?.venue?.topDragPerformers?.map(
                        (performerId, index) => {
                          // Find the performer in the getPerformers data
                          const performer = getPerformers?.find(p => p._id === performerId);
                          return (
                            <li key={index}>
                              <button
                                onClick={() => {
                                  navigate(`/performer-profile/${performerId}`);
                                  window.scrollTo(0, 0);
                                }}
                                className="text-left hover:text-[#FF00A2] transition-colors duration-200"
                              >
                                {performer?.fullDragName || performerId}
                              </button>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}

                {/* Location & Hours Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                  {venueDetail?.venue?.location && (
                    <div>
                      <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Location / Address
                      </h3>
                      <div className="flex items-start gap-2 text-white/90 leading-6 max-w-[50%] ">
                        {/* <span className="w-1.5 h-1.5 bg-white rounded-full mt-2"></span> */}
                        <div>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              venueDetail.venue.location
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#FF00A2]"
                          >
                            {(() => {
                              const address = venueDetail.venue.location;
                              const firstCommaIndex = address.indexOf(',');
                              if (firstCommaIndex !== -1) {
                                const streetAddress = address.substring(0, firstCommaIndex);
                                const cityStateZip = address.substring(firstCommaIndex + 1).trim();
                                return (
                                  <>
                                    {streetAddress}
                                    <br />
                                    {cityStateZip}
                                  </>
                                );
                              }
                              return address;
                            })()}
                          </a>
                          {venueDetail?.venue?.phone && (
                            <>
                              <br />
                              <a
                                href={`tel:${venueDetail.venue.phone.replace(
                                  /\D/g,
                                  ""
                                )}`}
                                className="underline hover:text-[#FF00A2]"
                              >
                                {venueDetail.venue.phone}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {venueDetail?.venue?.hoursOfOperation && (
                    <div>
                      <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Hours Of Operation
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 leading-6">
                        {/* <span className="w-1.5 h-1.5 bg-white rounded-full"></span> */}
                        <span>
                          {formatTimeRange(venueDetail.venue.hoursOfOperation)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Venue Type */}
                {venueDetail?.venue?.venueType && (
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                      Type Of Venue
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span>{formatVenueType(venueDetail.venue.venueType)}</span>
                    </div>
                  </div>
                )}

                {/* Facilities Section */}
                {venueDetail?.venue?.facilities?.length > 0 && (
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                      Facilities & Features
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-4 text-white/90">
                      {venueDetail.venue.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          <span>{formatFacility(facility)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visit Button */}
                {/* <div className="mt-4">
                  <button className="w-[222px] h-[62px] bg-[#FF00A2] hover:bg-[#d40085] text-white rounded-[83px] shadow-md font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase flex items-center justify-center">
                    Visit
                  </button>
                </div> */}
              </div>
            </>
          )}
        </div>

        {/* Right Section - Calendar */}
        <div className="col-span-1 lg:col-span-4 mx-auto w-full max-w-[500px] lg:max-w-none mt-8 lg:mt-0">
          {/* Calendar Toggle */}
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden flex mb-6">
            <button
              className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 text-[16px] lg:text-[20px] font-space-grotesk
                ${!isMonthView ? "bg-[#FF00A2] text-white" : "text-white/60"}`}
              onClick={() => handleViewChange(false)}
            >
              Week
            </button>
            <button
              className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 text-[16px] lg:text-[20px] font-space-grotesk
                ${isMonthView ? "bg-[#FF00A2] text-white" : "text-white/60"}`}
              onClick={() => handleViewChange(true)}
            >
              Month
            </button>
          </div>

          {/* Calendar Component */}
          <div className="bg-[#1A1A1A] rounded-xl p-4 lg:p-6">
            {/* Navigation Header */}
            <div className="flex justify-between items-center mb-6 lg:mb-8">
              {isDayView ? (
                <button
                  onClick={handleBackToMonthOrWeek}
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="lg:w-6 lg:h-6"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={isMonthView ? handlePrevMonth : handlePrevWeek}
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="lg:w-6 lg:h-6"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              <span className="text-white text-[20px] lg:text-[24px] font-space-grotesk">
                {isDayView
                  ? formatDay(selectedDay)
                  : isMonthView
                  ? formatMonthYear(currentDate)
                  : formatWeekRange(selectedWeekStart)}
              </span>

              {isDayView ? (
                <div className="w-10 h-10 lg:w-12 lg:h-12" />
              ) : (
                <button
                  onClick={isMonthView ? handleNextMonth : handleNextWeek}
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="lg:w-6 lg:h-6"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Calendar Grid - Only show if not in day view */}
            {!isDayView && (
              <div className="grid grid-cols-7 gap-1 lg:gap-2">
                {/* Days Header */}
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-[#FF00A2] text-[14px] lg:text-[16px] font-space-grotesk mb-2"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {getDaysInMonth(currentDate).map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="h-8 lg:h-12 bg-[#1A1A1A] rounded-lg"></div>;
                  }
                  
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const today = new Date();
                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected = selectedDay && date.toDateString() === selectedDay.toDateString();
                  let isInCurrentWeek = false;
                  if (!isMonthView) {
                    const weekStart = new Date(selectedWeekStart);
                    weekStart.setHours(0,0,0,0);
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekEnd.getDate() + 6);
                    isInCurrentWeek = date >= weekStart && date <= weekEnd;
                  }

                  return (
                    <div
                      key={index}
                      onClick={() => handleDayClick(day)}
                      className={`relative h-8 lg:h-12 flex items-center justify-center cursor-pointer
                        ${
                          isToday
                            ? "bg-[#FF00A2] text-white"
                            : isSelected
                            ? "bg-[#FF00A2] text-white"
                            : isInCurrentWeek
                            ? "bg-[#1E1E1E] text-white/90 border border-[#FF00A2]/30"
                            : "bg-[#2A2A2A] text-white/60"
                        }
                        rounded-lg text-[16px] lg:text-[18px] font-space-grotesk
                        transition-colors duration-200
                        ${isInCurrentWeek ? "hover:bg-[#2A1E2A]" : "hover:bg-[#3A3A3A]"}`}
                    >
                      {day}
                      {renderEventDots(day, !isMonthView && isInCurrentWeek)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Events Display Section */}
          <div className="mt-6 rounded-xl p-4 lg:p-6 bg-[#111111] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#FF00A2] text-[20px] lg:text-[24px] font-space-grotesk">
                {selectedDay
                  ? "DAY EVENTS"
                  : isMonthView
                  ? "THIS MONTH EVENTS"
                  : "THIS WEEK EVENTS"}
              </h3>
              {selectedDay && (
                <span className="text-white/60 text-[14px] lg:text-[16px]">
                  {selectedDay.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            {getEventsForDisplay().length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto pr-2">
                <div className="space-y-2">
                  {getEventsForDisplay().map((event, i) => {
                    // Use the same timezone handling as the dots
                    const eventDate = new Date(event.startDate);
                    let adjustedDate = eventDate;
                    
                    // Apply the same timezone fix that works for dots
                    if (
                      eventDate.getUTCHours() === 0 &&
                      eventDate.getUTCMinutes() === 0 &&
                      eventDate.getUTCSeconds() === 0
                    ) {
                      const localDate = new Date(eventDate);
                      const localDay = localDate.getDate();
                      const utcDay = eventDate.getUTCDate();
                      if (localDay < utcDay) {
                        localDate.setDate(localDate.getDate() + 1);
                        adjustedDate = localDate;
                      }
                    }
                    
                    return (
                      <div
                        key={event._id}
                        onClick={() => navigate(`/event-detail/${event._id}`)}
                        className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] ${
                          i === 0
                            ? "bg-gradient-to-r from-[#FF00A2] to-[#FF2AB2] shadow-[0_0_10px_rgba(255,0,162,0.5)]"
                            : isDayView
                            ? "bg-[#721345] hover:bg-[#822455]"
                            : "bg-[#FF00A2] hover:bg-[#721345]"
                        }`}
                      >
                        <div>
                          <h4 className="text-white font-medium">
                            {event.title && event.title.length > 15 ? event.title.slice(0, 15) + '...' : event.title}
                          </h4>
                          <p className="text-white/80 text-sm">
                            {adjustedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-white text-sm font-medium block">
                            {formatEventTime(event.startTime)}
                          </span>
                          <span className="text-white/70 text-xs block">
                            {event.host && event.user.name.length > 15 ? event.user.name.slice(0, 15) + '...' : event.user.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-white/60 mb-2">
                  {isDayView
                    ? "No events scheduled for this day"
                    : isMonthView
                    ? "No monthly events scheduled"
                    : "No weekly events scheduled"}
                </p>
                <p className="text-white/40 text-sm">
                  {isDayView
                    ? "Check another day"
                    : isMonthView
                    ? "Check back next month"
                    : "Check back next week"}
                </p>
              </div>
            )}
          </div>

          {/* Ad Image */}
          <div className="mt-5">
            <img
              src={ad?.[0]?.images[0]}
              alt="ad"
              className="w-full max-w-[500px] mx-auto lg:max-w-none"
            />
          </div>
        </div>
      </div>
      <Gallery
        images={venueDetail?.venue?.images || []}
        videos={venueDetail?.venue?.videos || []}
      />
      <Reviews />
    </div>
  );
};

export default VenuesProfile;
