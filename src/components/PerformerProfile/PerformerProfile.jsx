import React, { useState } from "react";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import { useParams } from "react-router-dom";
import { useGetSinglePerformerByIdQuery } from "../../apis/performers";
import { Youtube } from "lucide-react";

const PerformerProfile = () => {
  const [isMonthView, setIsMonthView] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { id } = useParams();
  const { data: performerDetail, isLoading: performerDetailLoading, error: performerError } =
    useGetSinglePerformerByIdQuery(id);

  // Mock event data - This will be replaced with API data later
  const eventDates = {
    "2025-05": {
      "3": { events: 4 },
      "8": { events: 1 },
      "10": { events: 3 },
      "14": { events: 2 },
      "18": { events: 1 },
      "21": { events: 2 },
      "23": { events: 1 },
      "25": { events: 3 },
      "28": { events: 1 },
      "30": { events: 2 }
    },
    "2025-06": {
      "2": { events: 1 },
      "5": { events: 2 },
      "8": { events: 3 },
      "12": { events: 1 },
      "15": { events: 2 },
      "18": { events: 1 },
      "22": { events: 3 },
      "25": { events: 2 },
      "28": { events: 1 },
      "30": { events: 2 }
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Get previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: startingDay }, (_, i) => prevMonthLastDay - startingDay + i + 1);
    
    // Get current month's days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Get next month's days
    const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getEventDots = (day) => {
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const events = eventDates[monthKey]?.[day]?.events;
    
    if (!events) return null;
    
    return (
      <div className="absolute bottom-1 lg:bottom-2 flex gap-0.5 lg:gap-1">
        {Array.from({ length: events }, (_, i) => (
          <div key={i} className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
        ))}
      </div>
    );
  };

  const formatDragAnniversary = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} '${year.toString().slice(-2)}`;
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

  if (performerError) {
    return (
      <div className="min-h-screen text-white p-4 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#FF00A2] mb-4">Error Loading Profile</h2>
          <p className="text-white/80">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4 lg:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left Section - Profile Info */}
        <div className="col-span-1 lg:col-span-8">
          {performerDetailLoading ? (
            <div className="flex mt-16 justify-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <h1 className="font-tangerine text-[64px] font-bold mb-4 lg:mb-8 text-center">
                {performerDetail?.performer?.fullDragName || "Performer Name"}
              </h1>

              {/* Profile Image and Social Links */}
              <div className="relative flex justify-center">
                <img
                  src={performerDetail?.performer?.profilePhoto || performerDetail?.performer?.images?.[0]}
                  alt={performerDetail?.performer?.fullDragName?.split(" ")[0] || "Performer"}
                  className="w-[377px] h-[389px] max-w-full mx-auto lg:w-[377px] lg:h-[389px] md:w-[300px] md:h-[310px] sm:w-[250px] sm:h-[260px] object-cover"
                />

                {/* Social Media Links */}
                <div className="flex flex-col gap-3 lg:gap-4 absolute right-0 top-0">
                  {performerDetail?.performer?.socialMediaLinks?.facebook && (
                    <a
                      href={performerDetail?.performer?.socialMediaLinks?.facebook}
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
                      href={performerDetail?.performer?.socialMediaLinks?.instagram}
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
                      href={performerDetail?.performer?.socialMediaLinks?.twitter}
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
                      href={performerDetail?.performer?.socialMediaLinks?.tiktok}
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
                      href={performerDetail?.performer?.socialMediaLinks?.youtube}
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
              <div className="relative mt-0 lg:mt-0">
                <div className="flex items-center w-full justify-center">
                  <img
                    src="/home/performer/image-tag.png"
                    alt="Crown"
                    className="w-[70px] h-[70px] text-[#FF00A2]"
                  />
                  <div className="w-1/2">
                    <div className="h-[3px] bg-[#FF00A2] ml-0"></div>
                  </div>
                </div>
                <div className="absolute left-20 top-10 right-0 text-center">
                  <h2 className="text-[#FF00A2] text-[12px] sm:text-[20px] font-space-grotesk">
                    Drag Anniversary:
                    <span className="font-medium">
                      {" "}
                      {formatDragAnniversary(performerDetail?.performer?.dragAnniversary)}
                    </span>
                  </h2>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xl lg:text-[20px] text-center mt-10 lg:mt-16 mb-12 lg:mb-16 max-w-[600px] mx-auto leading-tight font-normal">
                {performerDetail?.performer?.tagline || "No tagline available"}
              </p>

              {/* About Section */}
              <div className="mb-6 lg:mb-8">
                <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl text-center">
                  About {performerDetail?.performer?.fullDragName?.split(' ')[0] || "Performer"}'s Drag
                </h2>
                <p className="text-white/90 text-[18px] font-normal">
                  {performerDetail?.performer?.description || "No description available"}
                </p>
              </div>

              {/* Sections Grid */}
              <div className="space-y-6 lg:space-y-8">
                {/* Drag Family Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                      Drag Mother(s)
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-white/90">
                      {performerDetail?.performer?.dragMotherName?.map((mother, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                          <span>{mother}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                      Drag Family Associations
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-white/90">
                      {performerDetail?.performer?.dragFamilyAssociation?.map((family, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                          <span>{family}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Other Sections */}
                <div>
                  <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                    Competitions / Awards
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-white/90">
                    {performerDetail?.performer?.awards?.map((award, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Types Grid */}
                <div>
                  <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                    Drag Performances
                  </h3>
                  <div>
                    <ul className="list-disc list-inside grid grid-cols-2 lg:grid-cols-3 text-white/90">
                      {performerDetail?.performer?.dragPerformances?.map((item, index) => (
                        <li key={index} className="capitalize">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Illusions/Impersonations Section */}
                <div>
                  <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                    Illusions/Impersonations
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                    {performerDetail?.performer?.illusions?.map((illusion, index) => (
                      <ul key={index} className="list-disc list-inside">
                        <li>{illusion}</li>
                      </ul>
                    ))}
                  </div>
                </div>

                {/* Music Genre's Performed Section */}
                <div>
                  <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                    Music Genre's Performed
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 text-white/90">
                    {performerDetail?.performer?.genres?.map((genre, index) => {
                      const formattedGenre = (() => {
                        switch (genre) {
                          case "the80s":
                            return "The 80's";
                          case "rnb":
                            return "R&B";
                          case "jazzBlues":
                            return "Jazz/Blues";
                          default:
                            return genre.charAt(0).toUpperCase() + genre.slice(1);
                        }
                      })();

                      return (
                        <ul key={index} className="list-disc list-inside capitalize">
                          <li>{formattedGenre}</li>
                        </ul>
                      );
                    })}
                  </div>
                </div>

                {/* Venues Section */}
                <div>
                  <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl">
                    Where Can You Catch {performerDetail?.performer?.fullDragName?.split(' ')[0] || "Performer"} Performing?
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-white/90">
                    {performerDetail?.performer?.venues?.map((venue, index) => {
                      const venueLabel = venueOptions.find(
                        (option) => option.value === venue
                      )?.label;
                      return (
                        <div key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                          <span>{venueLabel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                ${!isMonthView ? "bg-[#2A2A2A] text-white" : "text-white/60"}`}
              onClick={() => setIsMonthView(false)}
            >
              Week
            </button>
            <button
              className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 text-[16px] lg:text-[20px] font-space-grotesk
                ${isMonthView ? "bg-[#FF00A2] text-white" : "text-white/60"}`}
              onClick={() => setIsMonthView(true)}
            >
              Month
            </button>
          </div>

          {/* Calendar Component */}
          <div className="bg-[#1A1A1A] rounded-xl p-4 lg:p-6">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-6 lg:mb-8">
              <button 
                onClick={handlePrevMonth}
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
              <span className="text-white text-[20px] lg:text-[24px] font-space-grotesk">
                {formatMonthYear(currentDate)}
              </span>
              <button 
                onClick={handleNextMonth}
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
            </div>

            {/* Calendar Grid */}
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
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`relative h-8 lg:h-12 flex items-center justify-center
                    ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? "bg-[#FF00A2]" : "bg-[#2A2A2A]"} 
                    rounded-lg text-[16px] lg:text-[18px] font-space-grotesk
                    ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? "text-white" : "text-white/60"}`}
                >
                  {day}
                  {getEventDots(day)}
                </div>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div className="mt-6 rounded-xl p-4 lg:p-6 bg-[#111111] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#FF00A2] text-[20px] lg:text-[24px] font-space-grotesk">
                FRIDAY
              </h3>
              <span className="text-white/60 text-[14px] lg:text-[16px]">
                03/05/2024
              </span>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className={`p-2 lg:p-3 rounded-lg text-white text-[14px] lg:text-base ${
                    i === 0 ? "bg-[#FF00A2]" : "bg-[#721345]"
                  }`}
                >
                  7PM - Performance Place-
                </div>
              ))}
            </div>
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
      <Gallery images={performerDetail?.performer?.images || []} />
      <Reviews />
    </div>
  );
};

export default PerformerProfile;
