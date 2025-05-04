import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/EventListening/Pagination";
import { useGetAllVenuesQuery } from "../../apis/venues";

const VenuesList = ({ isVenue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 4;

  const [activeTab, setActiveTab] = useState("Restaurants/Dining");
  const { data: allVenuesData, isLoading: allVenuesLoading } =
    useGetAllVenuesQuery({ page: 1, limit: 1000 });

  const tabs = ["Bar/Club", "Restaurants/Dining", "Other"];

  const filteredVenues =
    allVenuesData?.docs?.filter((venue) => {
      if (activeTab === "Bar/Club") {
        return venue.venueType === "Bar/Club";
      } else if (activeTab === "Restaurants/Dining") {
        return venue.venueType === "Restaurants/Dining";
      } else if (activeTab === "Other") {
        return venue.venueType === "Other";
      }
      return true;
    }) || [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                  onClick={() => setActiveTab(tab)}
                >
                  <div className="flex items-center mb-2">
                    {tab === "Bar/Club" && (
                      <img
                        src="/venues/venues-list/bar.svg"
                        alt="Bar"
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    {tab === "Restaurants/Dining" && (
                      <img
                        src="/venues/venues-list/dining.svg"
                        alt="Restaurants/Dining"
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    {tab === "Other" && (
                      <img
                        src="/venues/venues-list/other.svg"
                        alt="Drag Bingo"
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    <span className="font-['Space_Grotesk'] font-normal text-[18px] capitalize text-white">
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
        {allVenuesLoading ? (
          <div className="col-span-full flex mt-16 justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredVenues.length > 0 ? (
          filteredVenues
            .slice(
              (currentPage - 1) * venuesPerPage,
              currentPage * venuesPerPage
            )
            .map((venue) => (
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

      {isVenue && filteredVenues?.length > venuesPerPage && (
        <div className="flex justify-center w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredVenues.length / venuesPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default VenuesList;
