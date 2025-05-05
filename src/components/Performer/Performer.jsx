import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/EventListening/Pagination";
import { useGetAllPerformersQuery } from "../../apis/performers";
import { cityOptions } from "../../utils/citiesList";

const Performer = ({ isPerformer, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const performersPerPage = 8;
  const [activeTab, setActiveTab] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "Filter by",
    value: "",
  });
  const [isTabLoading, setIsTabLoading] = useState(false);
  const dropdownRef = useRef(null);

  const {
    data: allPerformersData,
    isLoading: allPerformersLoading,
    isFetching,
  } = useGetAllPerformersQuery({
    page: currentPage,
    limit: performersPerPage,
    search: searchQuery || "",
    address: selectedOption.value || undefined,
    pronoun: activeTab === "all" ? undefined : activeTab
  }, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, selectedOption]);

  const tabs = [
    { label: "Drag Queens", value: "drag-queen" },
    { label: "Drag Kings", value: "drag-king" },
    { label: "Other Performers", value: "other-performer" },
    { label: "All Performers", value: "all" },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (tabValue) => {
    if (tabValue === activeTab) return; // Don't do anything if clicking the same tab
    setIsTabLoading(true);
    setActiveTab(tabValue);
    setCurrentPage(1);
  };

  // Reset loading state when data is fetched
  useEffect(() => {
    if (!isFetching) {
      setIsTabLoading(false);
    }
  }, [isFetching]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = cityOptions.filter(
    (option) =>
      searchTerm === "" ||
      option.value === "all" ||
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
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
                    key={tab.value}
                    className="relative cursor-pointer flex flex-col items-center"
                    onClick={() => handleTabChange(tab.value)}
                  >
                    <div className="flex items-center mb-2">
                      {tab.value === "drag-queen" && (
                        <img
                          src="/home/eventlisting/drag-show.png"
                          alt="Drag Queens"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab.value === "drag-king" && (
                        <img
                          src="/home/eventlisting/drag-brunch.png"
                          alt="Drag Kings"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab.value === "other-performer" && (
                        <img
                          src="/home/eventlisting/drag-bingo.png"
                          alt="Other Performers"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {tab.value === "all" && (
                        <img
                          src="/home/eventlisting/other-event.png"
                          alt="All Performers"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      <span
                        className={`text-[18px] font-normal capitalize ${
                          activeTab === tab.value
                            ? "text-[#FF00A2]"
                            : "text-white"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </div>
                    {activeTab === tab.value && (
                      <div className="w-[117px] h-[3px] bg-[#FF00A2] rounded-[5px]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex justify-end mt-4 md:mt-0 relative"
              ref={dropdownRef}
            >
              <div
                className="w-[121px] h-[35px] rounded-[8px] border border-[#FF00A2] p-[12px] flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="font-['Space_Grotesk'] font-normal text-[16px] leading-[100%] text-white truncate">
                  {selectedOption.label}
                </span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
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

              {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-[200px] bg-[#1E1E1E] rounded-[8px] border border-[#FF00A2] shadow-lg z-10">
                  <div className="p-2 border-b border-[#FF00A2]">
                    <input
                      type="text"
                      placeholder="Search cities..."
                      className="w-full bg-transparent text-white placeholder-[#FF00A2] focus:outline-none font-['Space_Grotesk']"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF00A2] scrollbar-track-[#1E1E1E]">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className="px-3 py-2 hover:bg-[#FF00A2] hover:bg-opacity-20 cursor-pointer font-['Space_Grotesk'] text-white"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option.label}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-white font-['Space_Grotesk'] text-center">
                        No cities found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performer cards grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {(allPerformersLoading || isTabLoading) ? (
            <div className="col-span-full flex mt-16 justify-center min-h-[300px]">
              <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : allPerformersData?.docs?.length > 0 ? (
            allPerformersData.docs.map((performer) => (
              <div
                key={performer._id}
                className="w-full h-[400px] md:h-[475px] relative"
              >
                {/* Main Image */}
                <div className="relative">
                  <img
                    src={performer?.profilePhoto}
                    alt={performer?.fullDragName?.split(" ")[0]}
                    className="w-[295px] h-[200px] rounded-[8px] object-cover"
                  />
                  <div className="w-1/2 -bottom-0.5 absolute left-16 h-[4px] bg-[#FF00A2] rounded-[10px]"></div>
                  {/* Logo/Icon Image */}
                  <div className="absolute bottom-[-40px] left-[35px]">
                    <img
                      src="/home/performer/image-tag.png"
                      alt={`${performer.drag} logo`}
                      className="w-[80px] h-[80px]"
                    />
                  </div>
                </div>

                <div className="text-black rounded-b-[8px] pt-10 md:pt-14 px-4 md:px-6 pb-4 md:pb-6 mt-[-8px] h-[220px] md:h-[300px] flex flex-col">
                  <div className="h-[50px] md:h-[60px]">
                    <h3 className="font-['Space_Grotesk'] text-[#FFFFFF] font-bold text-[18px] md:text-[24px] leading-[100%] capitalize mb-3 md:mb-4 mt-2 md:mt-0">
                      {performer?.fullDragName}
                    </h3>
                  </div>
                  <Link to={`/performer-profile/${performer?._id}`} onClick={() => window.scrollTo(0, 0)}>
                    <button className="w-[120px] sm:w-[198px] h-[40px] sm:h-[62px] bg-[#FF00A2] rounded-[82px] border-[2px] md:border-[3px] border-[#FF00A2] font-['Space_Grotesk'] font-normal text-[14px] sm:text-[20px] leading-[100%] text-white uppercase hover:bg-pink-600 transition flex items-center justify-center">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-white text-xl">
                No performers found in this category.
              </p>
            </div>
          )}
        </div>

        {isPerformer && allPerformersData?.totalPages > 1 && (
          <div className="flex justify-center w-full mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={allPerformersData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Performer;