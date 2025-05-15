import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/EventListening/Pagination";
import { useGetAllVenuesQuery } from "../../apis/venues";

const VenuesList = ({ isVenue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 12;
  const [activeTab, setActiveTab] = useState("restaurant/dining");
  const [isTabLoading, setIsTabLoading] = useState(false);

  const { data: allVenuesData, isLoading: allVenuesLoading, isFetching } = useGetAllVenuesQuery({
    page: currentPage,
    limit: venuesPerPage,
    venueType: activeTab
  }, {
    refetchOnMountOrArgChange: true
  });

  const tabs = ["bar/club", "restaurant/dining", "other"];

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

  return (
    <div className="bg-gradient-to-b text-white py- px-4 md:px-8 pt-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-[105px] h-[6px] bg-[#FF00A2] rounded-[10px]"></div>
        </div>
        <div>
          {/* <Link
            to="#"
            className="font-['Space_Grotesk'] font-[400] text-[16px] leading-[100%] text-[#FF00A2] px-4 py-2 rounded"
          >
            View All
          </Link> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div>
          <h2 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none uppercase mb-2">
            Venues
          </h2>
        </div>
      </div>

      {/* Category Tabs with Filter Dropdown */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="block md:flex md:justify-between md:items-center">
          <div className="md:flex-grow md:flex md:justify-center scrollbar-hide overflow-x-auto pb-6 md:pb-2">
            <div className="flex justify-center space-x-6 min-w-max">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className="relative cursor-pointer flex flex-col items-center"
                  onClick={() => handleTabChange(tab)}
                >
                  <div className="flex items-center mb-2">
                    {tab === "bar/club" && (
                      <img
                        src="/venues/venues-list/bar.svg"
                        alt="Bar"
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    {tab === "restaurants/dining" && (
                      <img
                        src="/venues/venues-list/dining.svg"
                        alt="Restaurants/Dining"
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    {tab === "other" && (
                      <img
                        src="/venues/venues-list/other.svg"
                        alt="Drag Bingo"
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    <span className={`font-['Space_Grotesk'] font-normal text-[18px] capitalize ${
                      activeTab === tab ? "text-[#FF00A2]" : "text-white"
                    }`}>
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
        </div>
      </div>

      {/* Performer cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
        {(allVenuesLoading || isTabLoading) ? (
          <div className="col-span-full flex mt-16 justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : allVenuesData?.docs?.length > 0 ? (
          allVenuesData.docs.map((venue) => (
            <div
              key={venue._id}
              className="w-full h-[475px] md:h-[475px] relative"
            >
              {/* Main Image */}
              <div className="relative">
                <img
                  src={venue?.logo}
                  alt={venue?.name}
                  className="w-full h-[230px] md:h-[250px] rounded-[8px] object-cover"
                />
              </div>

              <div className="text-black rounded-b-[8px] pt-8 px-6 pb-6 mt-[-8px] h-[300px] flex flex-col items-center">
                <div className="h-[60px] text-center">
                  <h3 className="font-['Space_Grotesk'] text-[#FFFFFF] font-bold text-[24px] leading-[100%] capitalize mb-4">
                    {venue?.name}
                  </h3>
                </div>
                <Link to={`/venue-profile/${venue?._id}`} onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-[160px] sm:w-[198px] h-[50px] sm:h-[62px] bg-[#FF00A2] rounded-[82px] border-[3px] border-[#FF00A2] font-['Space_Grotesk'] font-normal text-[16px] sm:text-[20px] leading-[100%] text-white uppercase hover:bg-pink-600 transition flex items-center justify-center">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-white text-xl">
              No venues found in this category
            </p>
          </div>
        )}
      </div>

      {isVenue && allVenuesData?.totalPages > 1 && (
        <div className="flex justify-center w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={allVenuesData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default VenuesList;
