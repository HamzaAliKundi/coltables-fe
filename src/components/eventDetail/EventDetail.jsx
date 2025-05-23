import React, { useState } from "react";
import { useGetSingleEventByIdQuery } from "../../apis/events";
import { Link, useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();

  const { data: getEventsByVenuesById, isLoading: getEventLoading } =
    useGetSingleEventByIdQuery(id);
  const [showMore, setShowMore] = useState(false);

  const performers = getEventsByVenuesById?.event?.performersList || [];
  const performer = getEventsByVenuesById?.event?.user || null;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const extractTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  const formatEventType = (type) => {
    const types = {
      "drag-show": "Drag Show",
      "drag-brunch": "Drag Brunch",
      "drag-bingo": "Drag Bingo",
      "drag-trivia": "Drag Trivia",
      other: "Other",
    };
    return types[type] || "Other";
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
            src={
              getEventsByVenuesById?.event?.image || "/events/event-1.jpg.svg"
            }
            alt="event"
            className="w-[500px] h-[500px] object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3 w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-gradient-to-b from-[#FF00A2] to-[#D876B5] rounded-full flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-[#e3d4de] leading-none">
              {String(
                new Date(getEventsByVenuesById?.event?.startDate).getDate()
              ).padStart(2, "0")}
            </span>
            <span className="text-base md:text-lg font-semibold text-[#ebd4e3] uppercase leading-none">
              {formatDate(getEventsByVenuesById?.event?.startDate)?.slice(0, 3)}
            </span>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="mb-6 lg:mb-8 mt-4 lg:mt-12">
            <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-base md:text-lg lg:text-xl text-center">
              {getEventsByVenuesById?.event?.title}
            </h2>

            <div className="flex flex-col gap-4 md:gap-6">
              {/* First row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-20">
                  <div className="flex items-start gap-2">
                    <img
                      src="/events/Background.png"
                      alt="bullet"
                      className="w-5 h-5"
                    />
                    <span className="truncate">
                      {getEventsByVenuesById?.event?.host}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 max-w-sm">
                    <img
                      src="/events/Background-1.png"
                      alt="bullet"
                      className="w-5 h-5 mt-1"
                    />

                    <div className="flex flex-col">
                      <div
                        className={`${
                          showMore ? "flex-wrap" : "truncate"
                        } flex gap-2 max-w-xs`}
                      >
                        {performers.length > 0 ? (
                          performers.map((performer) => (
                            <Link
                              key={performer?._id}
                              to={`/performer-profile/${performer?._id}`}
                              onClick={() => window.scrollTo(0, 0)}
                              className="border-b border-gray-400"
                            >
                              {performer?.fullDragName}
                            </Link>
                          ))
                        ) : performer?.userType === "performer" ? (
                          <Link
                            key={performer?._id}
                            to={`/performer-profile/${performer?._id}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className="border-b border-gray-400"
                          >
                            {performer?.fullDragName}
                          </Link>
                        ) : (
                          <span>N/A</span>
                        )}
                      </div>

                      {performers.length > 2 && (
                        <button
                          onClick={() => setShowMore(!showMore)}
                          className="text-[#D876B5] text-sm underline mt-1 self-start"
                        >
                          {showMore ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second row */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                  <div className="flex items-center gap-2">
                    <img
                      src="/events/Background-3.png"
                      alt="bullet"
                      className="w-5 h-5"
                    />
                    <span className="truncate">
                      Starts:{" "}
                      {extractTime(getEventsByVenuesById?.event?.startTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/events/Background-2.png"
                      alt="bullet"
                      className="w-5 h-5"
                    />
                    {getEventsByVenuesById?.event?.userType !== "venue" && (
                      <span className="truncate">
                        {getEventsByVenuesById?.event?.address || "N/A"}
                      </span>
                    )}

                    {getEventsByVenuesById?.event?.userType === "venue" && (
                      <span className="truncate">
                        {getEventsByVenuesById?.event?.user?.name || "N/A"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Third row - single item centered */}
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="/events/Background-4.png"
                    alt="bullet"
                    className="w-5 h-5"
                  />
                  <span>
                    {formatEventType(getEventsByVenuesById?.event?.type)}
                  </span>
                </div>
              </div>

              <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-0 text-base md:text-lg lg:text-xl text-center">
                About Event
              </h2>
              <div className="border-b-[3px] border-[#FF00A2] mb-3 pb-3 flex text-white">
                <p className="text-white">
                  {getEventsByVenuesById?.event?.description ? (
                    getEventsByVenuesById.event.description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < getEventsByVenuesById.event.description.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  ) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
