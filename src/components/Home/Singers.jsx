const Singers = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap relative w-full max-w-[1280px] mx-auto">
      <div className="inline-flex animate-marquee">
        {/* First set of images */}
        <div className="flex min-w-max">
          <img
            src="/singers/alexyeus.png"
            alt="Singer 1"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/casper.png"
            alt="Singer 2"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/chloe.png"
            alt="Singer 3"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/dessie.png"
            alt="Singer 4"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/dina.png"
            alt="Singer 5"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/iris.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/kofi.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4 object-contain"
          />
          <img
            src="/singers/rachel.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/tommie.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex min-w-max">
          <img
            src="/singers/alexyeus.png"
            alt="Singer 1"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/casper.png"
            alt="Singer 2"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/chloe.png"
            alt="Singer 3"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/dessie.png"
            alt="Singer 4"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/dina.png"
            alt="Singer 5"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/iris.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/kofi.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4 object-contain"
          />
          <img
            src="/singers/rachel.png"
            alt="Singer 6"
            className="w-[204px] h-[296px] mx-4"
          />
          <img
            src="/singers/tommie.png"
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
