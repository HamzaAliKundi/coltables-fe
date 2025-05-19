import React, { useState } from "react";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglePerformerByIdQuery } from "../../apis/performers";
import { Youtube } from "lucide-react";
import { useGetCalendarEventsQuery } from "../../apis/events";

const performancesOptions = [
  { value: "dance", label: "Dance" },
  { value: "burlesque", label: "Burlesque" },
  { value: "campy", label: "Campy" },
  { value: "comedy", label: "Comedy" },
  { value: "dance-twirl", label: "Dance/Twirl" },
  { value: "drag-bingo", label: "Drag Bingo" },
  { value: "drag-karaoke", label: "Drag Karaoke" },
  { value: "drag-trivia", label: "Drag Trivia" },
  { value: "hosting", label: "Hosting" },
  { value: "lip-sync", label: "Lip Sync" },
  { value: "live-singing", label: "Live Singing" },
  { value: "other", label: "Other" },
];

const genreOptions = [
  { value: "the80s", label: "The 80's" },
  { value: "tejano", label: "Tejano" },
  { value: "rnb", label: "R&B" },
  { value: "country", label: "Country" },
  { value: "comedy", label: "Comedy" },
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "jazzBlues", label: "Jazz/Blues" },
  { value: "disney", label: "Disney" },
  { value: "other", label: "Other's" },
  {
    value: "alternative",
    label: "Alternative (Emo, Goth, etc.)",
  },
  { value: "comedy-mix", label: "Comedy Mix" },
  { value: "musical-theater", label: "Musical Theater" },
  { value: "the-70s", label: "The 70's" },
  { value: "the-90s", label: "The 90's" },
  { value: "the-2000s", label: "The 2000's" },
];

const PerformerProfile = () => {
  const [isMonthView, setIsMonthView] = useState(true);
  const [isDayView, setIsDayView] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: performerDetail,
    isLoading: performerDetailLoading,
    error: performerError,
  } = useGetSinglePerformerByIdQuery(id);

  const { data: calendarEvents } = useGetCalendarEventsQuery(
    {
      view: isMonthView ? "month" : "day",
      fromDate: isDayView
        ? `${selectedDay.getFullYear()}-${String(
            selectedDay.getMonth() + 1
          ).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}`
        : `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}`,
      userId: id,
      userType: "performer",
    },
    {
      skip: !isMonthView && !isDayView, // Skip API call for week view
    }
  );

  // Helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from(
      { length: startingDay },
      (_, i) => prevMonthLastDay - startingDay + i + 1
    );

    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );

    const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from(
      { length: remainingDays },
      (_, i) => i + 1
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
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
    });
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const getEventsForDay = (day) => {
    if (!calendarEvents?.eventDates) return [];
    const monthKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    const dayStr = String(day).padStart(2, "0");

    return calendarEvents.eventDates[monthKey]?.[dayStr]?.eventDetails || [];
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

    if (selectedDay) {
      // When a day is selected, show only that day's events
      const monthKey = `${selectedDay.getFullYear()}-${String(
        selectedDay.getMonth() + 1
      ).padStart(2, "0")}`;
      const dayStr = String(selectedDay.getDate()).padStart(2, "0");
      return calendarEvents.eventDates[monthKey]?.[dayStr]?.eventDetails || [];
    } else if (isMonthView) {
      // In month view, show all events for the current month
      const monthKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthEvents = calendarEvents.eventDates[monthKey] || {};
      return Object.values(monthEvents).flatMap(
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

      return weekEvents;
    }
  };

  const handleViewChange = (isMonth) => {
    setIsMonthView(isMonth);
    setIsDayView(false);
    setSelectedDay(null);
  };

  const venueOptions = [
    { value: "jps-bar", label: "JP's Bar And Grill, Eagle" },
    { value: "eagle", label: "Eagle" },
    { value: "boheme", label: "Boheme" },
    { value: "rich's", label: "Rich's/The Montrose Country Club" },
    {
      value: "hamburger-marys",
      label: "Hamburger Mary's/YKYK, HALO (Bryan, TX)",
    },
    { value: "crush", label: "Crush (Dallas, TX)" },
    { value: "havana", label: "Havana (Dallas TX)" },
    { value: "woodlawn", label: "Woodlawn Pointe (San Antonio, TX)" },
  ];

  const formatVenue = (text) =>
    text
      .split(/[\s\-_/]+/) // Split on space, dash, underscore, slash
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  if (performerError) {
    return (
      <div className="min-h-screen text-white p-4 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#FF00A2] mb-4">
            Error Loading Profile
          </h2>
          <p className="text-white/80">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left Section - Profile Info */}
        <div className="col-span-1 lg:col-span-8">
          {performerDetailLoading ? (
            <div className="flex mt-16 justify-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <h1 className="font-tangerine text-5xl py-6 md:py-0 md:text-[64px] font-bold mb-4 lg:mb-8 text-center">
                {performerDetail?.performer?.fullDragName || "Performer Name"}
              </h1>

              {/* Profile Image and Social Links */}
              <div className="relative flex justify-center">
                <div className="md:w-[350px] w-[377px] rounded-lg ">
                  <img
                    src={
                      performerDetail?.performer?.profilePhoto ||
                      performerDetail?.performer?.images?.[0]
                    }
                    alt={
                      performerDetail?.performer?.fullDragName?.split(" ")[0] ||
                      "Performer"
                    }
                    className="md:w-[350px] w-[377px] h-[450px] object-fit rounded-lg"
                    // style={{ objectPosition: "0px -42px" }}
                  />
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col gap-3 lg:gap-4 absolute lg:top-0 right-0 top-1">
                  {performerDetail?.performer?.socialMediaLinks?.facebook && (
                    <a
                      href={
                        performerDetail?.performer?.socialMediaLinks?.facebook
                      }
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

                  {performerDetail?.performer?.socialMediaLinks?.instagram && (
                    <a
                      href={
                        performerDetail?.performer?.socialMediaLinks?.instagram
                      }
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

                  {performerDetail?.performer?.socialMediaLinks?.twitter && (
                    <a
                      href={
                        performerDetail?.performer?.socialMediaLinks?.twitter
                      }
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

                  {performerDetail?.performer?.socialMediaLinks?.tiktok && (
                    <a
                      href={
                        performerDetail?.performer?.socialMediaLinks?.tiktok
                      }
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

                  {performerDetail?.performer?.socialMediaLinks?.youtube && (
                    <a
                      href={
                        performerDetail?.performer?.socialMediaLinks?.youtube
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
                    >
                      <Youtube size={50} color="red" />
                    </a>
                  )}
                </div>
              </div>

              {/* Crown and Anniversary Section */}
              <div className="mt-5 md:mt-0">
                <div className="relative mt-[-20px] lg:mt-[-15px]">
                  <div className="flex items-center w-full justify-center">
                    <img
                      src="/home/performer/image-tag.png"
                      alt="Crown"
                      className="w-[70px] h-[70px] text-[#FF00A2]"
                    />
                    <div className="w-[77%] md:w-[60%]">
                      <div className="h-[3px] bg-[#FF00A2] ml-[-7px]"></div>
                    </div>
                  </div>
                  <div className="absolute left-20 top-10 right-0 text-center">
                    <h2 className="text-[#FF00A2] text-[14px] sm:text-[20px] font-space-grotesk">
                      Drag Anniversary:
                      <span className="font-medium">
                        {" "}
                        {performerDetail?.performer?.dragAnniversary
                          ? new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "2-digit",
                            })
                              .format(
                                new Date(
                                  performerDetail.performer.dragAnniversary
                                )
                              )
                              .replace(/(\w+) (\d+)/, "$1, $2")
                          : "N/A"}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xl lg:text-[20px] text-center mt-10 lg:mt-16 mb-12 lg:mb-16 max-w-[600px] mx-auto leading-tight font-normal">
                {performerDetail?.performer?.tagline || "No tagline available"}
              </p>

              {/* About Section */}
              <div className="mb-6 lg:mb-8">
                <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-[20px] font-space-grotesk font-bold leading-none capitalize text-center">
                  About{" "}
                  {performerDetail?.performer?.fullDragName?.split(" ")[0] ||
                    "Performer"}
                  's Drag
                </h2>
                <p className="text-white/90 text-[18px] font-normal">
                  {performerDetail?.performer?.description ||
                    "No description available"}
                </p>
              </div>

              {/* Sections Grid */}
              <div className="space-y-6 lg:space-y-8">
                {/* Drag Mothers Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                  {performerDetail?.performer?.dragMotherName?.length > 0 &&
                    performerDetail?.performer?.dragMotherName[0] !== "" && (
                      <div>
                        <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                          Drag Mother(s)
                        </h3>
                        <div className="h-[3px] bg-[#FF00A2]"></div>
                        <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-white/90">
                          {performerDetail?.performer?.dragMotherName?.map(
                            (mother, index) => (
                              <div key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                                <span>{mother}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Drag Family Section */}
                  {performerDetail?.performer?.dragFamilyAssociation?.length >
                    0 && (
                    <div>
                      <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Drag Family Associations
                      </h3>
                      <div className="h-[3px] bg-[#FF00A2]"></div>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-white/90">
                        {performerDetail?.performer?.dragFamilyAssociation?.map(
                          (family, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                              <span>{family}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Sections */}
                {performerDetail?.performer?.awards?.length > 0 &&
                  performerDetail?.performer?.awards[0] !== "" && (
                    <div>
                      <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Competitions / Awards
                      </h3>
                      <div className="h-[3px] bg-[#FF00A2]"></div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-white/90">
                        {performerDetail?.performer?.awards?.map(
                          (award, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                              <span>{award}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Performance Types Grid */}
                {performerDetail?.performer?.dragPerformances?.length > 0 &&
                  performerDetail?.performer?.dragPerformances[0] !== "" && (
                    <div>
                      <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Drag Performances
                      </h3>
                      <div className="h-[3px] bg-[#FF00A2]"></div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-white/90">
                        {performerDetail?.performer?.dragPerformances?.map(
                          (item, index) => {
                            const matchedPerformance = performancesOptions.find(
                              (option) => option.value === item
                            );
                            const displayLabel = matchedPerformance
                              ? matchedPerformance.label
                              : item;

                            return (
                              <div key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                                <span>{displayLabel}</span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                {/* Illusions/Impersonations Section */}
                {performerDetail?.performer?.illusions?.length > 0 &&
                  performerDetail?.performer?.illusions[0] !== "" && (
                    <div>
                      <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Illusions/Impersonations
                      </h3>
                      <div className="h-[3px] bg-[#FF00A2]"></div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-white/90">
                        {performerDetail?.performer?.illusions?.map(
                          (illusion, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                              <span>{illusion}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Music Genre's Performed Section */}
                {performerDetail?.performer?.genres?.length > 0 &&
                  performerDetail?.performer?.genres[0] !== "" && (
                    <div>
                      <h3 className="text-white mb-2 text-[20px] font-space-grotesk font-bold leading-none capitalize">
                        Music Genre's Performed
                      </h3>
                      <div className="h-[3px] bg-[#FF00A2]"></div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 text-white/90">
                        {performerDetail?.performer?.genres?.map(
                          (genre, index) => {
                            const matchedGenre = genreOptions.find(
                              (option) => option.value === genre
                            );
                            const displayLabel = matchedGenre
                              ? matchedGenre.label
                              : genre;

                            return (
                              <div key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                                <span>{displayLabel}</span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                {/* Venues Section */}
                {performerDetail?.performer?.venues?.length > 0 &&
                  performerDetail?.performer?.venues[0] !== "" && (
                    <div>
                      <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-[20px] font-space-grotesk font-bold leading-none capitalize text-center">
                        Where Can You Catch{" "}
                        {performerDetail?.performer?.fullDragName?.split(
                          " "
                        )[0] || "Performer"}{" "}
                        Performing?
                      </h2>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-1 gap-x-2 text-white/90">
                        {performerDetail?.performer?.venues?.map(
                          (venue, index) => {
                            const venueLabel = venueOptions.find(
                              (option) => option.value === venue
                            )?.label;
                            return (
                              <div key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                                <span>
                                  {venueLabel ? venueLabel : formatVenue(venue)}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
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
                  const date = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  );
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  const isSelected =
                    selectedDay &&
                    date.toDateString() === selectedDay.toDateString();
                  const isInCurrentWeek = isMonthView
                    ? false
                    : date >=
                        new Date(
                          selectedWeekStart.getFullYear(),
                          selectedWeekStart.getMonth(),
                          selectedWeekStart.getDate() -
                            selectedWeekStart.getDay()
                        ) &&
                      date <=
                        new Date(
                          selectedWeekStart.getFullYear(),
                          selectedWeekStart.getMonth(),
                          selectedWeekStart.getDate() -
                            selectedWeekStart.getDay() +
                            6
                        );

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
                ${
                  isInCurrentWeek ? "hover:bg-[#2A1E2A]" : "hover:bg-[#3A3A3A]"
                }`}
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
                  {getEventsForDisplay().map((event, i) => (
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
                          {event.title}
                        </h4>
                        <p className="text-white/80 text-sm">
                          {formatEventDate(event.startDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-white text-sm font-medium block">
                          {formatEventTime(event.startTime)}
                        </span>
                        <span className="text-white/70 text-xs block">
                          {event.host}
                        </span>
                      </div>
                    </div>
                  ))}
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
              src="/performer-profile/ad.svg"
              alt="ad"
              className="w-full max-w-[500px] mx-auto lg:max-w-none"
            />
          </div>
        </div>
      </div>
      <Gallery
        images={performerDetail?.performer?.images || []}
        videos={performerDetail?.performer?.videos || []}
      />
      <Reviews />
    </div>
  );
};

export default PerformerProfile;
