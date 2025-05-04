import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const bannerImages = [
    "/venues/banner/banner-1.svg",
    "/venues/banner/banner-2.svg",
  ];

  const totalSlides = bannerImages.length;
  const indicatorWidth = 200; 
  const segmentWidth = indicatorWidth / totalSlides; 
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  return (
    <div className="relative bg-black text-white min-h-[500px] md:min-h-[700px] overflow-hidden">
      {/* Left Banner Image - Only visible on desktop */}
      {!isMobile && (
        <div className="absolute left-0 md:left-16 top-0 w-full md:w-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${currentSlide}`}
              className="relative w-full md:w-auto"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={bannerImages[currentSlide]} 
                alt="Venue visual" 
                className="object-contain w-[400px] h-[650px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Text Content */}
      <div className="absolute left-0 right-0 top-[140px] md:top-[280px] z-10 px-4 text-center">
        
        <h1 className="font-['Space_Grotesk'] font-bold text-[28px] md:text-[68px] leading-[36px] md:leading-[70px] text-white">
        Where can <span className="text-[#FF00A2]">you find</span><br />the Drag?
        </h1>
      </div>

      {/* Mobile Banner Image - Only one image shown on mobile */}
      {isMobile && (
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${currentSlide}`}
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <img 
                src={bannerImages[currentSlide]} 
                alt="Venue visual" 
                className="object-contain w-full md:w-[650px] h-[400px] md:h-[650px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Right Banner Image - Only visible on desktop */}
      {!isMobile && (
        <div className="absolute right-0 md:right-16 top-0 w-full md:w-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${currentSlide}`}
              className="relative w-full md:w-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={bannerImages[(currentSlide + 1) % totalSlides]} 
                alt="Venue visual" 
                className="object-contain w-[400px] h-[650px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

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
