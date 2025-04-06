import React, { useState } from "react";
import Gallery from "./Gallery";
import Reviews from "./Reviews";

const PerformerProfile = () => {
  const [isMonthView, setIsMonthView] = useState(true);

  return (
    <div className="min-h-screen  text-white p-4 lg:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left Section - Profile Info */}
        <div className="col-span-1 lg:col-span-8">
          <h1 className="font-tangerine text-[64px] font-bold mb-4 lg:mb-8 text-center">
            Catalina Seymour-Alexander
          </h1>

          {/* Profile Image and Social Links */}
          <div className="relative flex justify-center">
            <img
              src="/performer-profile/performer-profile.svg"
              alt="Catalina Seymour-Alexander"
              className="w-[377px] h-[389px] max-w-full mx-auto lg:w-[377px] lg:h-[389px] md:w-[300px] md:h-[310px] sm:w-[250px] sm:h-[260px]"
            />

            {/* Social Media Links */}
            <div className="flex flex-col gap-3 lg:gap-4 absolute right-0 top-0">
              <a
                href="#"
                className="w-[46px] h-[46px] lg:w-12 lg:h-12 rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/facebook.svg"
                  alt="Facebook"
                  className="w-[46px] h-[46px] lg:w-[46] lg:h-[46]"
                />
              </a>
              <a
                href="#"
                className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/instagram.svg"
                  alt="Instagram"
                  className="w-[46px] h-[46px] lg:w-[46] lg:h-[46]"
                />
              </a>
              <a
                href="#"
                className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/x.svg"
                  alt="Twitter"
                  className="w-[46px] h-[46px] lg:w-12 lg:h-12"
                />
              </a>
              <a
                href="#"
                className="w-[46px] h-[46px] lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center"
              >
                <img
                  src="/performer-profile/tiktok.svg"
                  alt="TikTok"
                  className="w-[46px] h-[46px] lg:w-12 lg:h-12"
                />
              </a>
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
                <span className="font-medium">October '22</span>
              </h2>
            </div>
          </div>


          {/* Tagline */}
          <p className="text-xl lg:text-[20px] text-center mt-10 lg:mt-16 mb-12 lg:mb-16 max-w-[600px] mx-auto leading-tight font-normal">
            This Beautiful And Talented Queen Will Twirl And Leave You Begging
            For An Encore With Her Electrifying Energy!
          </p>

          {/* About Section */}
          <div className="mb-6 lg:mb-8">
            <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl text-center">
              About Catalina's Drag
            </h2>
            <p className="text-white/90 text-[18px] font-normal">
              I am a Latin Showgirl with all of the kicks, splits, tricks and
              dips! I have been performing for a little over 2 years now and
              cannot wait to continue to grow and showcase my talents to the
              world! I am influenced and inspired by all of my Spanish Culture
              and Heritage and try to showcase it through my drag and
              performance style!
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
                <ul className="list-disc list-inside text-white/90">
                  <li>Iris Seymour</li>
                  <li>Mulan Alexander</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                  Drag Family Associations
                </h3>
                <ul className="list-disc list-inside text-white/90">
                  <li>Seymour</li>
                  <li>Alexander</li>
                </ul>
              </div>
            </div>

            {/* Other Sections */}
            <div>
              <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                Competitions / Awards
              </h3>
              <ul className="list-disc list-inside text-white/90">
                <li>Miss San Antonio Latina 2024</li>
              </ul>
            </div>

            {/* Performance Types Grid */}
            <div>
              <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                Drag Performances
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                <ul className="list-disc list-inside">
                  <li>Hosting</li>
                  <li>Lip Sync</li>
                  <li>Dance/Twirl</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Burlesque</li>
                  <li>Drag Trivia</li>
                  <li>Drag Bingo</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Campy</li>
                  <li>Drag Karaoke</li>
                  <li>Comedy</li>
                </ul>
              </div>
            </div>

            {/* Illusions/Impersonations Section */}
            <div>
              <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                Illusions/Impersonations
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                <ul className="list-disc list-inside">
                  <li>Selena</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Jennifer Lopez</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Nicole Scherzinger</li>
                </ul>
              </div>
            </div>

            {/* Music Genre's Performed Section */}
            <div>
              <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-2 text-lg">
                Music Genre's Performed
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                <ul className="list-disc list-inside">
                  <li>The 80's</li>
                  <li>Tejano</li>
                  <li>R&B</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Rock</li>
                  <li>Pop</li>
                  <li>Jazz/Blues</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Country</li>
                  <li>Comedy</li>
                  <li>Disney</li>
                </ul>
              </div>
            </div>

            {/* Venues Section */}
            <div>
              <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl">
                Where Can You Catch Catalina Performing?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
                <ul className="list-disc list-inside">
                  <li>JR's</li>
                  <li>Rip's</li>
                  <li>Boheme</li>
                  <li>Rich's/The Montrose Country</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>Hamburger Mary's/VKYK</li>
                  <li>Eagle</li>
                  <li>Heaven (Dallas, TX)</li>
                  <li>Hidden Pointe (San Antonio, TX)</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>HALO (Bryan, TX)</li>
                  <li>Crush (Dallas, TX)</li>
                </ul>
              </div>
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

export default PerformerProfile;