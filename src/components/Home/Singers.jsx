import React from "react";

const Singers = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap relative w-full max-w-[1280px] mx-auto">
      <div className="inline-flex animate-marquee">
        {/* First set of images */}
        <div className="flex min-w-max">
          <img
            src="/home/singers/singer1.svg"
            alt="Singer 1"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer2.svg"
            alt="Singer 2"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer3.svg"
            alt="Singer 3"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer4.svg"
            alt="Singer 4"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer5.svg"
            alt="Singer 5"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer6.svg"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex min-w-max">
          <img
            src="/home/singers/singer1.svg"
            alt="Singer 1"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer2.svg"
            alt="Singer 2"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer3.svg"
            alt="Singer 3"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer4.svg"
            alt="Singer 4"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer5.svg"
            alt="Singer 5"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/home/singers/singer6.svg"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        .min-w-max {
          min-width: max-content;
        }
      `}</style>
    </div>
  );
};

export default Singers;
