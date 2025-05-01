import React, { useState } from "react";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import { useParams } from "react-router-dom";
import { useGetSingleVenueByIdQuery } from "../../apis/venues";
import { Youtube } from "lucide-react";

const VenuesProfile = () => {
  const [isMonthView, setIsMonthView] = useState(true);
  const { id } = useParams();
  const { data: venueDetail, isLoading: venueDetailLoading } =
    useGetSingleVenueByIdQuery(id);

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
              <h1 className="font-tangerine text-[64px] font-bold mb-4 lg:mb-8 text-center">
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
                <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl text-center">
                  About {venueDetail?.venue?.name}
                </h2>
                <p className="text-white/90 text-sm lg:text-base">
                  {venueDetail?.venue?.description}
                </p>
              </div>

              {/* Sections Grid */}
              <div className="space-y-6 lg:space-y-8">
                {/* Performers Section */}
                <div>
                  <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                    Which Performers May You Find Here?
                  </h3>
                  <ul className="list-disc list-inside grid grid-cols-2 gap-y-2 text-white/90">
                    {venueDetail?.venue?.topDragPerformers?.map((performer, index) => (
                      <li key={index}>{performer}</li>
                    ))}
                  </ul>
                </div>

                {/* Location & Hours Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                      Location / Address
                    </h3>
                    <p className="text-white/90 leading-6">
                      <a
                        href="https://goo.gl/maps/XYZ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#FF00A2]"
                      >
                        {venueDetail?.venue?.location}
                      </a>
                      <br />
                      <a
                        href="tel:17136369615"
                        className="underline hover:text-[#FF00A2]"
                      >
                        {venueDetail?.venue?.phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                      Hours Of Operation
                    </h3>
                    <ul className="text-white/90 leading-6">
                      <li>
                        {formatTimeRange(venueDetail?.venue?.hoursOfOperation)}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Venue Type */}
                <div>
                  <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                    Type Of Venue
                  </h3>
                  <ul className="list-disc list-inside text-white/90">
                    <li>{venueDetail?.venue?.venueType}</li>
                  </ul>
                </div>

                {/* Facilities Section */}
                {venueDetail?.venue?.facilities?.length > 0 && (
                  <div>
                    <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                      Facilities & Features
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                      {venueDetail.venue.facilities.map((facility, index) => (
                        <div key={index} className="list-disc list-inside">
                          <li className="text-white/90">
                            {formatFacility(facility)}
                          </li>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visit Button */}
                <div className="mt-4">
                  <button className="w-[222px] h-[62px] bg-[#FF00A2] hover:bg-[#d40085] text-white rounded-[83px] shadow-md font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase flex items-center justify-center">
                    Visit
                  </button>
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
          <div className="bg-[#1A1A1A] rounded-xl p-3 lg:p-5">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-5 lg:mb-6">
              <button className="w-9 h-9 lg:w-10 lg:h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
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
                May - 2024
              </span>
              <button className="w-9 h-9 lg:w-10 lg:h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
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
              {[
                28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 29, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                1, 2, 3, 4, 5, 6, 7, 8,
              ].map((day, index) => (
                <div
                  key={index}
                  className={`relative h-7 lg:h-10 flex items-center justify-center
                    ${day === 3 ? "bg-[#FF00A2]" : "bg-[#2A2A2A]"} 
                    rounded-lg text-[16px] lg:text-[18px] font-space-grotesk
                    ${day === 3 ? "text-white" : "text-white/60"}`}
                >
                  {day}
                  {/* Event Dots */}
                  {day === 8 && (
                    <div className="absolute bottom-1 lg:bottom-2 w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                  )}
                  {day === 10 && (
                    <div className="absolute bottom-1 lg:bottom-2 flex gap-0.5 lg:gap-1">
                      <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                      <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                    </div>
                  )}
                  {day === 14 && (
                    <div className="absolute bottom-1 lg:bottom-2 flex gap-0.5 lg:gap-1">
                      <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                      <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                      <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                    </div>
                  )}
                  {day === 23 && (
                    <div className="absolute bottom-1 lg:bottom-2 w-1 lg:w-1.5 h-1 lg:h-1.5 bg-[#FF00A2] rounded-full"></div>
                  )}
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
      <Gallery />
      <Reviews />
    </div>
  );
};

export default VenuesProfile;
