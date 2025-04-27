import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/EventListening/Pagination";
import { useGetAllPerformersQuery } from "../../apis/performers";

const Performer = ({ isPerformer, searchQuery }) => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const [activeTab, setActiveTab] = useState("Drag Queens");
  const { data: allPerformersData } = useGetAllPerformersQuery({
    page,
    limit,
    search: searchQuery || "",
  });

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const tabs = [
    "Drag Queens",
    "Drag Kings",
    "Other Performers",
    "All Performers",
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <div className="bg-gradient-to-b text-white py- px-4 md:px-8 pt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[105px] h-[6px] bg-[#FF00A2] rounded-[10px]"></div>
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
                      {tab === "Drag Queens" && (
                        <img
                          src="/home/eventlisting/drag-show.png"
                          alt="Drag Queens"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "Drag Kings" && (
                        <img
                          src="/home/eventlisting/drag-brunch.png"
                          alt="Drag Kings"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "Other Performers" && (
                        <img
                          src="/home/eventlisting/drag-bingo.png"
                          alt="Other Performers"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab === "All Performers" && (
                        <img
                          src="/home/eventlisting/other-event.png"
                          alt="All Performers"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      <span
                        className={`text-[18px] font-normal capitalize ${
                          activeTab === tab ? "text-[#FF00A2]" : "text-white"
                        }`}
                      >
                        {tab}
                      </span>
                    </div>
                    {activeTab === tab && (
                      <div className="w-[117px] h-[3px] bg-[#FF00A2] rounded-[5px]"></div>
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
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {allPerformersData?.docs?.map((performer) => (
            <div
              key={performer._id}
              className="w-full h-[400px] md:h-[475px] relative"
            >
              {/* Main Image */}
              <div className="relative">
                <img
                  src={
                    performer?.profilePhoto
                  }
                  alt={performer.name}
                  className="w-full md:w-[295px] h-[230px] md:h-[250px] rounded-[8px] object-cover"
                />
                <div className="w-1/2 -bottom-0.5 absolute left-16 h-[4px] bg-[#FF00A2] rounded-[10px]"></div>
                {/* Logo/Icon Image */}
                <div className="absolute bottom-[-40px] left-[35px]">
                  <img
                    src="/home/performer/image-tag.png"
                    alt={`${performer.name} logo`}
                    className="w-[80px] h-[80px]"
                  />
                </div>
              </div>

              <div className="text-black rounded-b-[8px] pt-10 md:pt-14 px-4 md:px-6 pb-4 md:pb-6 mt-[-8px] h-[220px] md:h-[300px] flex flex-col">
                <div className="h-[50px] md:h-[60px]">
                  <h3 className="font-['Space_Grotesk'] text-[#FFFFFF] font-bold text-[18px] md:text-[24px] leading-[100%] capitalize mb-3 md:mb-4">
                    {performer.name}
                  </h3>
                </div>

                <Link to={`/performer-profile/${performer?._id}`}>
                  <button className="w-[120px] sm:w-[198px] h-[40px] sm:h-[62px] bg-[#FF00A2] rounded-[82px] border-[2px] md:border-[3px] border-[#FF00A2] font-['Space_Grotesk'] font-normal text-[14px] sm:text-[20px] leading-[100%] text-white uppercase hover:bg-pink-600 transition flex items-center justify-center">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {isPerformer && allPerformersData?.totalPages > 1 && (
          <div className="flex justify-center w-full mt-8">
            <Pagination
              currentPage={page}
              totalPages={allPerformersData?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Performer;
