import { useState, useRef, useEffect } from "react";

const ExpandableText = ({ previewText, fullText, isExpanded, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("auto");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "4.5em");
    }
  }, [isExpanded, previewText, fullText]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{ height }}
      >
        <div
          className={`transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-90"
          }`}
        >
          {isExpanded ? fullText : previewText}
        </div>
      </div>
      <button
        onClick={onClick}
        className="text-[#FF00A2] underline hover:text-pink-300 transition-colors duration-200 mt-2 focus:outline-none"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

const WhoWeAre = () => {
  const [expandedSections, setExpandedSections] = useState({
    main: false,
    venues: false,
    performers: false,
    support: false,
  });

  const toggleExpand = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const fullTexts = {
    main: "DragSpace is a vibrant and inclusive platform dedicated to celebrating, showcasing, and amplifying the incredible artistry of drag performers. As a dynamic and thriving hub, it serves as a space where talented drag artists and venues come together to collaborate, innovate, and create unforgettable, high-quality entertainment experiences. With its focus on diversity and inclusion, DragSpace fosters a community that brings people of all backgrounds and identities together to enjoy and support drag culture in all its forms. Whether you're a seasoned drag fan or new to the scene, DragSpace offers a welcoming environment that highlights the creativity, resilience, and beauty of drag performance, ensuring that every show is an exceptional and memorable experience for audiences from all walks of life. Our mission is to revolutionize the drag entertainment industry by providing cutting-edge tools and resources that empower performers and venues alike, while creating unforgettable experiences for fans worldwide.",
    venues:
      "Designed to assist venues in managing their profiles, providing an easy way to showcase the unique atmosphere and experiences they offer. With an intuitive platform, venues can quickly update their information, events, and special promotions, ensuring they attract the right audience. DragSpace also provides analytics to help venues understand their performance and optimize their offerings.",
    performers:
      "DragSpace makes it effortless for performers to showcase their unique talents to fans and offering them a user-friendly platform to easily connect with venues and unlock incredible opportunities. Performers can create detailed profiles, share their performance videos, and get discovered by venues looking for specific talents. The platform also handles bookings and payments, making the business side of drag more manageable.",
    support:
      "Committed to providing comprehensive online and phone support to ensure you make the most of your experience on the platform. Whether you need help navigating the platform, troubleshooting technical issues, or optimizing your profile, our dedicated support team is available 24/7 to assist you. We also offer regular workshops and tutorials to help users maximize the platform's potential.",
  };

  const previewTexts = {
    main: "DragSpace is a vibrant and inclusive platform dedicated to celebrating, showcasing, and amplifying the incredible artistry of drag performers. As a dynamic and thriving hub, it serves as a space where talented drag artists and venues come together to collaborate, innovate, and create unforgettable, high-quality entertainment experiences. With its focus on diversity and inclusion...",
    venues:
      "Designed to assist venues in managing their profiles, providing an easy way to showcase the unique atmosphere and experiences they offer. With an intuitive platform, venues can quickly update their information...",
    performers:
      "DragSpace makes it effortless for performers to showcase their unique talents to fans and offering them a user-friendly platform to easily connect with venues and unlock incredible opportunities...",
    support:
      "Committed to providing comprehensive online and phone support to ensure you make the most of your experience on the platform. Whether you need help navigating the platform...",
  };

  return (
    <div className="text-white py-8 md:py-16 px-4">
      {/* Section Title */}
      <h2 className="font-['Space_Grotesk'] font-bold text-[20px] md:text-[24px] leading-[100%] text-center uppercase text-[#FF00A2] mb-6 md:mb-10">
        Who we are...
      </h2>

      {/* Main Description */}
      <div className="max-w-[1274px] mx-auto px-3 mb-8 md:mb-16">
        <ExpandableText
          previewText={previewTexts.main}
          fullText={fullTexts.main}
          isExpanded={expandedSections.main}
          onClick={() => toggleExpand("main")}
        />
      </div>

      {/* Three Column Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto mb-8 md:mb-16 px-4 md:px-8">
        {/* Venues Column */}
        <div className="flex flex-col items-center w-full max-w-[380px] mx-auto">
          <img
            src="/home/whoWeAre/venues.png"
            alt="Venues"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] mb-3 md:mb-4 hover:scale-105 transition-transform duration-200"
          />
          <h3 className="font-['Space_Grotesk'] font-bold text-[18px] md:text-[20px] mb-3 md:mb-4">
            Venues
          </h3>
          <ExpandableText
            previewText={previewTexts.venues}
            fullText={fullTexts.venues}
            isExpanded={expandedSections.venues}
            onClick={() => toggleExpand("venues")}
          />
        </div>

        {/* Performers Column */}
        <div className="flex flex-col items-center w-full max-w-[380px] mx-auto">
          <img
            src="/home/whoWeAre/performers.png"
            alt="Performers"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] mb-3 md:mb-4 hover:scale-105 transition-transform duration-200"
          />
          <h3 className="font-['Space_Grotesk'] font-bold text-[18px] md:text-[20px] mb-3 md:mb-4">
            Performers
          </h3>
          <ExpandableText
            previewText={previewTexts.performers}
            fullText={fullTexts.performers}
            isExpanded={expandedSections.performers}
            onClick={() => toggleExpand("performers")}
          />
        </div>

        {/* Support Column */}
        <div className="flex flex-col items-center w-full max-w-[380px] mx-auto">
          <img
            src="/home/whoWeAre/settings.png"
            alt="Support"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] mb-3 md:mb-4 hover:scale-105 transition-transform duration-200"
          />
          <h3 className="font-['Space_Grotesk'] font-bold text-[18px] md:text-[20px] mb-3 md:mb-4">
            Support
          </h3>
          <ExpandableText
            previewText={previewTexts.support}
            fullText={fullTexts.support}
            isExpanded={expandedSections.support}
            onClick={() => toggleExpand("support")}
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;

{
  /* CTA Button */
}
{
  /* <div className="flex justify-center px-4 md:px-0">
  <Link to="/host-event" className="w-full md:w-auto">
    <button className="w-full md:w-[448px] bg-[#FF00A2] h-[40px] md:h-[46px] rounded-[50px] px-6 md:px-10 py-2 font-['Space_Grotesk'] font-normal text-[16px] md:text-[20px] leading-[100%] text-white uppercase hover:bg-pink-600 transition-colors">
      Looking to Host a Private Event?
    </button>
  </Link>
</div> */
}
