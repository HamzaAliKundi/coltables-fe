import React, { useState } from "react";
import Gallery from "./Gallery";
import Reviews from "./Reviews";

const VenuesProfile = () => {
  const [isMonthView, setIsMonthView] = useState(true);

  return (
    <div className="min-h-screen text-white p-4 lg:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left Section - Profile Info */}
        <div className="col-span-1 lg:col-span-8">
          <h1 className="font-['Petit_Formal_Script'] text-2xl lg:text-4xl mb-4 lg:mb-8 text-center">
            Chapman & Kirby
          </h1>

          {/* Profile Image and Social Links */}
          <div className="relative flex justify-center">
            <img
              src="/venue-profile/venue.svg"
              alt="Catalina Seymour-Alexander"
              className="w-full max-w-[550px] h-auto mx-auto"
            />

            {/* Social Media Links */}
            <div className="flex flex-col gap-3 lg:gap-4 absolute right-0 top-0">
              <a
                href="#"
                className="w-10 h-10 lg:w-12 lg:h-12 bg-[#1877F2] rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/facebook.svg"
                  alt="Facebook"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/instagram.svg"
                  alt="Instagram"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/x.svg"
                  alt="Twitter"
                  className="w-10 h-10 lg:w-12 lg:h-12"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/tiktok.svg"
                  alt="TikTok"
                  className="w-10 h-10 lg:w-12 lg:h-12"
                />
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6 lg:mb-8 mt-12">
            <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl text-center">
              About Chapman & Kirby
            </h2>
            <p className="text-white/90 text-sm lg:text-base">
              This Downtown bar transforms into a stage with an electrifying
              monthly drag brunch show. Those 21 and up can enjoy the
              performances, along with a brunch buffet, select craft cocktails,
              and bubbly mimosa flights, plus optional bottle service.
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
                <li>Adriana LaRue</li>
                <li>Reign LaRue</li>
                <li>Keyumiyah Dupree</li>
                <li>Chloe Crawford Ross</li>
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
                    2118 Lamar St #100, <br />
                    Houston, TX 77003
                  </a>
                  <br />
                  <a
                    href="tel:17136369615"
                    className="underline hover:text-[#FF00A2]"
                  >
                    1 (713) 636-9615
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                  Hours Of Operation
                </h3>
                <ul className="text-white/90 leading-6">
                  <li>Mon-Tues: Closed</li>
                  <li>Wed-Thur: 5PM - 12AM</li>
                  <li>Fri-Sat: 5PM - 2AM</li>
                  <li>Sun: 12PM - 10PM</li>
                </ul>
              </div>
            </div>

            {/* Venue Type */}
            <div>
              <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                Type Of Venue
              </h3>
              <ul className="list-disc list-inside text-white/90">
                <li>Bar/ Club</li>
              </ul>
            </div>

            {/* Facilities Section */}
            <div>
              <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
                Facilities & Features
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                <ul className="list-disc list-inside space-y-1">
                  <li>Stage Size & Type</li>
                  <li>Seating Arrangements</li>
                  <li>
                    Sound & Lighting Equipment (Available In-House or Need to
                    Rent)
                  </li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>Food & Beverages</li>
                  <li>Backstage & Dressing Rooms</li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>Stage Size & Type</li>
                  <li>Parking Availability</li>
                </ul>
              </div>
            </div>

            {/* Visit Button */}
            <div className="mt-4">
              <button className="w-[222px] h-[62px] bg-[#FF00A2] hover:bg-[#d40085] text-white rounded-[83px] shadow-md font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase flex items-center justify-center">
                Visit
              </button>
            </div>
          </div>
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
              <button className="w-10 h-10 lg:w-12 lg:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
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
              <button className="w-10 h-10 lg:w-12 lg:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
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
                  className={`relative h-8 lg:h-12 flex items-center justify-center
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