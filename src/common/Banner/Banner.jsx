import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useGetAllBannersQuery } from "../../apis/adsBanner";
import { skipToken } from "@reduxjs/toolkit/query";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isPerformerPage = location.pathname === "/performers";
  const isVenuePage = location.pathname === "/venues";
  const isEventPage = location.pathname === "/events";

  const { data: homeBanner } = useGetAllBannersQuery(
    isHomePage ? "home" : skipToken
  );

  const { data: performerBanner, } = useGetAllBannersQuery(
    isPerformerPage ? "performer" : skipToken
  );

  // console.log(homeBanner[0].images[2]);

  const homePageBannerImages = [
    homeBanner?.[0]?.images[1],
    homeBanner?.[0]?.images[2],
  ];

  const performerPageBannerImages = [
    performerBanner?.[0]?.images[1],
    performerBanner?.[0]?.images[2],
  ];

  const totalSlides = homePageBannerImages.length;
  const indicatorWidth = 200; 
  const segmentWidth = indicatorWidth / totalSlides; 
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setImageLoading(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
    setImageLoading(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="relative text-white max-w-[1400px] mx-auto min-h-[500px] md:min-h-[650px] overflow-hidden">
      {/* Text Content */}
      <div className="absolute -left-0 right-0 md:left-[200px] md:right-auto top-[140px] md:top-[280px] z-10 px-4 md:px-0 text-center md:text-left">
        <h2 className="font-['Space_Grotesk'] font-bold text-[18px] md:text-[32px] leading-[100%] capitalize mb-2 md:mb-4 text-white">
          When And Where?
        </h2>
        <h1 className="font-['Space_Grotesk'] font-bold text-[32px] md:text-[68px] leading-[36px] md:leading-[70px] text-[#FF00A2]">
          Find Your Favorite<br />Performers
        </h1>
      </div>

      {/* Banner Image with Shadow for Mobile */}
      <div className="absolute right-0 md:right-16 top-0 w-full md:w-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="relative w-full md:w-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:hidden absolute inset-0 bg-black opacity-50"></div>
            {isHomePage && homePageBannerImages[currentSlide] && (
              <img 
                src={homePageBannerImages[currentSlide]} 
                alt="Drag performers" 
                className="object-cover md:object-contain w-full md:w-[650px] h-[400px] md:h-[650px]"
                onLoad={handleImageLoad}
                style={{ opacity: imageLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}
              />  
            )}
            {isPerformerPage && performerPageBannerImages[currentSlide] && (
              <img 
                src={performerPageBannerImages[currentSlide]} 
                alt="Drag performers" 
                className="object-cover md:object-contain w-full md:w-[650px] h-[400px] md:h-[650px]"
                onLoad={handleImageLoad}
                style={{ opacity: imageLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}
              />  
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-[20px] top-[200px] md:top-[320px] bg-[#181818] rounded-full w-[30px] h-[30px] md:w-[50px] md:h-[50px] flex items-center justify-center z-20"
      >
        <img 
          src="/home/banner/left-arrow.png" 
          alt="Previous" 
          className="w-[15px] h-[15px] md:w-[25px] md:h-[25px]"
        />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-[20px] top-[200px] md:top-[320px] bg-[#181818] rounded-full w-[30px] h-[30px] md:w-[50px] md:h-[50px] flex items-center justify-center z-20"
      >
        <img 
          src="/home/banner/right-arrow.png" 
          alt="Next" 
          className="w-[15px] h-[15px] md:w-[25px] md:h-[25px]"
        />
      </button>

      {/* Slide Indicators */}
      <div
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-400 rounded-full"
        style={{ width: `${indicatorWidth}px`, height: "4px" }}
      >
        <motion.div
          className="absolute h-[8px] bg-[#FF00A2] rounded-full -top-0.5"
          style={{ width: `${segmentWidth}px` }}
          animate={{ left: currentSlide * segmentWidth }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Banner;
