import { useLocation } from "react-router-dom";
import { useGetAllBannersQuery } from "../../apis/adsBanner";
import { skipToken } from "@reduxjs/toolkit/query";

const Advertisment = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isPerformerPage = location.pathname === "/performers";
  const isVenuePage = location.pathname === "/venues";
  const isEventPage = location.pathname === "/events";

  const { data: homeBanner } = useGetAllBannersQuery(
    isHomePage ? "home" : skipToken
  );

  const { data: venueBanner } = useGetAllBannersQuery(
    isVenuePage ? "venue" : skipToken
  );

  const { data: performerBanner } = useGetAllBannersQuery(
    isPerformerPage ? "performer" : skipToken
  );

  const { data: eventBanner } = useGetAllBannersQuery(
    isEventPage ? "event" : skipToken
  );

  return (
    <div className="flex justify-center items-center w-full">
      <div className="m-0 md:my-12 lg:my-16">
        {isHomePage && (
          <img
            src={homeBanner?.[0]?.images[0]}
            alt="banner"
            className="w-[1200px] h-[300px] object-contain"
          />
        )}

        {isPerformerPage && (
          <img
            src={performerBanner?.[0]?.images[0]}
            alt="banner"
            className="w-[1200px] h-[300px] object-contain"
          />
        )}

        {isVenuePage && (
          <img
            src={venueBanner?.[0]?.images[0]}
            alt="banner"
            className="w-[1200px] h-[300px] object-contain"
          />
        )}

        {isEventPage && (
          <img
            src={eventBanner?.[0]?.images[0]}
            alt="banner"
            className="w-[1200px] h-[300px] text-white object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default Advertisment;
