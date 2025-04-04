import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/EventListening/Pagination";

const Performer = () => {
  const scrollContainerRef = useRef(null);
  const [, setCurrentIndex] = useState(0);

  const performers = [
    {
      id: 1,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Adriana LaRue",
      description:
        "Internationally renowned and the baddest bitch in Houston, will twirl with unmatched ...",
    },
    {
      id: 2,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Catalina Seymour-Alexander",
      description:
        "This beautiful and talented queen will twirl and leave you begging for an encore...",
    },
    {
      id: 3,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Iris Seymour",
      description:
        "She's a whirlwind of humor and high-energy charisma, lighting up the stage ...",
    },
    {
      id: 4,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Kofi",
      description:
        "She captivates & stuns audiences with her passionate performances...",
    },
    {
      id: 1,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Mistress Isabelle Brooks",
      description:
        "Internationally renowned and the baddest bitch in Houston, will twirl with unmatched ...",
    },
    {
      id: 2,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Athena Sapphire",
      description:
        "This beautiful and talented queen will twirl and leave you begging for an encore...",
    },
    {
      id: 3,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Violet Chachki",
      description:
        "She's a whirlwind of humor and high-energy charisma, lighting up the stage ...",
    },
    {
      id: 4,
      mainImage: "/home/performer/permormer-image.png",
      logoImage: "/home/performer/image-tag.png",
      name: "Eureka O'Hara",
      description:
        "She captivates & stuns audiences with her passionate performances...",
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : performers.length - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
      setCurrentIndex((prev) => (prev < performers.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="bg-gradient-to-b text-white pt-12 px-4 md:px-8">
      {/* Header with pink line and VIEW ALL */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-[105px] h-[6px] bg-[#FF00A2] rounded-[10px]"></div>
        </div>
        <Link
          to="/performers"
          className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] align-middle text-[#FF00A2]"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Main section title */}
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="font-['Space_Grotesk'] font-normal text-[32px] leading-[100%] uppercase">
          Your Area Drag Performers
        </h2>
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="max-w-7xl mx-auto flex justify-between md:hidden mb-4">
        <button
          onClick={scrollLeft}
          className="bg-[#181818] rounded-full w-[40px] h-[40px] flex items-center justify-center"
          aria-label="Scroll left"
        >
          <img src="/home/banner/left-arrow.png" alt="Left" className="w-4 h-4" />
        </button>

        <button
          onClick={scrollRight}
          className="bg-[#181818] rounded-full w-[40px] h-[40px] flex items-center justify-center"
          aria-label="Scroll right"
        >
          <img src="/home/banner/right-arrow.png" alt="Right" className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop Navigation Arrows */}
      <div className="max-w-7xl mx-auto relative hidden md:block">
        <button
          onClick={scrollLeft}
          className="absolute left-[-60px] top-[200px] z-10 bg-[#181818] rounded-full w-[55px] h-[55px] flex items-center justify-center"
          aria-label="Scroll left"
        >
          <img src="/home/banner/left-arrow.png" alt="Left" className="w-6 h-6" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-[-60px] top-[200px] z-10 bg-[#181818] rounded-full w-[55px] h-[55px] flex items-center justify-center"
          aria-label="Scroll right"
        >
          <img src="/home/banner/right-arrow.png" alt="Right" className="w-6 h-6" />
        </button>
      </div>

      {/* Horizontal scrollable container */}
      <div className="max-w-full md:max-w-7xl mx-auto overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex space-x-4 md:space-x-6 pb-4 min-w-max">
            {performers.map((performer) => (
              <div
                key={performer.id}
                className="w-[280px] md:w-[295.5px] h-[560px] md:h-[591px] relative"
              >
                {/* Main Image */}
                <div className="relative">
                  <img
                    src={performer.mainImage}
                    alt={performer.name}
                    className="w-full md:w-[295px] h-[230px] md:h-[250px] rounded-[8px] object-cover"
                  />

                  {/* Logo/Icon Image */}
                  <div className="absolute bottom-[-40px] left-[35px]">
                      <img
                        src={performer.logoImage}
                        alt={`${performer.name} logo`}
                        className="w-[80px] h-[80px]"
                      />
                  </div>
                </div>

                <div className="bg-[] text-black rounded-b-[8px] pt-14 px-6 pb-6 mt-[-8px] h-[300px] flex flex-col">
                  <div className="flex-grow">
                    <h3 
                      className="font-['Space_Grotesk'] text-[#FFFFFF] font-bold text-[24px] leading-[100%] capitalize mb-4 cursor-pointer"
                      title={performer.name}
                    >
                      {performer.name.length > 20 
                        ? <>{performer.name.slice(0, 20)}<span className="text-[#FF00A2]">...</span></>
                        : performer.name}
                    </h3>

                    <p className="font-['Space_Grotesk'] text-[#8E96A4] font-normal text-[16px] leading-[24px]">
                      {performer.description.length > 50 
                        ? <>{performer.description.slice(0, 50)}<span className="text-[#FF00A2]">...</span></>
                        : performer.description}
                    </p>
                  </div>

                  <div className="flex justify- mt-4">
                    <Link to={`/performer-profile/${performer.id}`}>
                      <button className="w-[160px] sm:w-[198px] h-[50px] sm:h-[62px] bg-[#FF00A2] rounded-[82px] border-[3px] border-[#FF00A2] font-['Space_Grotesk'] font-normal text-[16px] sm:text-[20px] leading-[100%] text-white uppercase hover:bg-pink-600 transition flex items-center justify-center">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Performer;
