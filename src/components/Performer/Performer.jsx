import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/EventListening/Pagination";

const Performer = ({ isPerformer }) => {
  const [activeTab, setActiveTab] = useState("Drag Show");

  const tabs = [
    "Drag Show",
    "Drag Brunch",
    "Drag Bingo",
    "Drag Trivia",
    "Other Event",
  ];

  const performers = [
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

  return (
    <>
      <div className="bg-gradient-to-b text-white py- px-4 md:px-8 pt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[105px] h-[6px] bg-pink-500 rounded-[10px]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
          <div>
            <h2 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none uppercase mb-2">
              Your Area Drag Performers
            </h2>
          </div>
        </div>

        {/* Category Tabs with Filter Dropdown */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="block md:flex md:justify-between md:items-center">
            <div className="md:flex-grow md:flex md:justify-center scrollbar-hide overflow-x-auto pb-2">
              <div className="flex justify-center space-x-6 min-w-max">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    className="relative cursor-pointer flex flex-col items-center"
                    onClick={() => setActiveTab(tab)}
                  >
                    <div className="flex items-center mb-2">
                      {tab === "Drag Show" && (
                        <img
                          src="/home/eventlisting/drag-show.png"
                          alt="Drag Show"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "Drag Brunch" && (
                        <img
                          src="/home/eventlisting/drag-brunch.png"
                          alt="Drag Brunch"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "Drag Bingo" && (
                        <img
                          src="/home/eventlisting/drag-bingo.png"
                          alt="Drag Bingo"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "Drag Trivia" && (
                        <img
                          src="/home/eventlisting/drag-trive.png"
                          alt="Drag Trivia"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "Other Event" && (
                        <img
                          src="/home/eventlisting/other-event.png"
                          alt="Other Event"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      <span
                        className={`font-['Space_Grotesk'] font-normal text-[18px] capitalize ${
                          activeTab === tab ? "text-pink-500" : "text-white"
                        }`}
                      >
                        {tab}
                      </span>
                    </div>
                    {activeTab === tab && (
                      <div className="w-[117px] h-[3px] bg-pink-500 rounded-[5px]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4 md:mt-0">
              <div className="w-[121px] h-[35px] rounded-[8px] border border-[#FF00A2] p-[12px] flex items-center justify-between cursor-pointer">
                <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] text-white">
                  Filter by
                </span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Performer cards grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
          {performers.map((performer) => (
            <div
              key={performer.id}
              className="w-full h-[475px] md:h-[475px] relative"
            >
              {/* Main Image */}
              <div className="relative">
                <img
                  src={performer.mainImage}
                  alt={performer.name}
                  className="w-full h-[230px] md:h-[250px] rounded-[8px] object-cover"
                />

                {/* Logo/Icon Image */}
                <div className="absolute bottom-[-40px] left-[35px]">
                  <div className="w-[80px] h-[80px] bg-white rounded-[2px] flex items-center justify-center p-2">
                    <img
                      src={performer.logoImage}
                      alt={`${performer.name} logo`}
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="text-black rounded-b-[8px] pt-14 px-6 pb-6 mt-[-8px] h-[300px] flex flex-col">
                <div className="h-[60px]">
                  <h3 className="font-['Space_Grotesk'] text-[#FFFFFF] font-bold text-[24px] leading-[100%] capitalize mb-4">
                    {performer.name}
                  </h3>
                </div>

                <Link to={`/performer-profile/${performer.id}`}>
                  <button className="w-[160px] sm:w-[198px] h-[50px] sm:h-[62px] bg-[#FF00A2] rounded-[82px] border-[3px] border-[#FF00A2] font-['Space_Grotesk'] font-normal text-[16px] sm:text-[20px] leading-[100%] text-white uppercase hover:bg-pink-600 transition flex items-center justify-center">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {isPerformer && (
          <div className="flex justify-center w-full mt-8">
            <Pagination />
          </div>
        )}
      </div>
    </>
  );
}

export default Performer
