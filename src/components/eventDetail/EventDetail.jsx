import React from "react";
import { useGetSingleEventByIdQuery } from "../../apis/events";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const EventDetail = () => {
  const { id } = useParams();
  const { data: getEventsByVenuesById, isLoading: getEventLoading } =
    useGetSingleEventByIdQuery(id);

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy 'at' h:mm a");
  };

  const formatEventType = (type) => {
    const types = {
      "drag-show": "Drag Show",
      "drag-brunch": "Drag Brunch",
      "drag-bingo": "Drag Bingo",
      "drag-trivia": "Drag Trivia",
      "comedy-show": "Comedy Show",
      "music-concert": "Music Concert",
      "dance-performance": "Dance Performance",
      "theater-show": "Theater Show",
      other: "Other",
    };
    return types[type] || type;
  };

  if (getEventLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-12">
        <div className="w-8 h-8 border-2 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-8 md:pt-16 px-4">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center w-full max-w-[1200px]">
        <div className="p-2 relative w-full lg:w-auto">
          <img
            src={getEventsByVenuesById?.event?.image || "/events/event-1.jpg.svg"}
            alt="event"
            className="w-full max-w-[750px] h-auto object-cover rounded-lg"
          />
          {/* <div className="absolute top-3 left-3 w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-gradient-to-b from-[#FF00A2] to-[#D876B5] rounded-full flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-[#e3d4de] leading-none">
              {formatDateTime(getEventsByVenuesById?.event.startTime)?.split(" ")[1]?.replace(",", "")}
            </span>
            <span className="text-base md:text-lg font-semibold text-[#ebd4e3] uppercase leading-none">
              {formatDateTime(getEventsByVenuesById?.event.startTime)?.slice(0, 3)}
            </span>
          </div> */}
        </div>

        <div className="w-full">
          <div className="mb-6 lg:mb-8 mt-4 lg:mt-12">
            <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-base md:text-lg lg:text-xl text-center">
              {getEventsByVenuesById?.event?.title}
            </h2>

            <div className="flex flex-col gap-4 md:gap-6">
              {/* First row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-20">
                  <div className="flex items-center gap-2">
                    <img src="/events/Background.png" alt="bullet" className="w-5 h-5" />
                    <span className="truncate">{getEventsByVenuesById?.event?.host}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/events/Background-1.png" alt="bullet" className="w-5 h-5" />
                    <span className="truncate">
                      {getEventsByVenuesById?.event?.performersList?.length
                        ? getEventsByVenuesById.event.performersList.map((p) => p.name).join(", ")
                        : "Adriana LaRue, Adriana LaRue, Adriana LaRue"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Second row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                  <div className="flex items-center gap-2">
                    <img src="/events/Background-3.png" alt="bullet" className="w-5 h-5" />
                    <span className="truncate">{formatDateTime(getEventsByVenuesById?.event?.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/events/Background-2.png" alt="bullet" className="w-5 h-5" />
                    <span className="truncate">
                      {getEventsByVenuesById?.event?.location || "The Montrose Country Club, Houston"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Third row - single item centered */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex items-center gap-2">
                  <img src="/events/Background-4.png" alt="bullet" className="w-5 h-5" />
                  <span>{formatEventType(getEventsByVenuesById?.event?.type)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
