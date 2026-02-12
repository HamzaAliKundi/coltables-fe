import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetCalendarEventsForListingQuery } from "../../apis/events";

// Helper to get local date parts safely (use startDateTime converted to admin timezone)
function getLocalDateParts(event) {
  // If we have startDateTime and adminTimezone, convert UTC to admin's timezone to get the correct date
  // This ensures events that start late at night (crossing midnight in UTC) show the correct date
  // Example: Event starts Jan 30 7 PM CST = Jan 31 1 AM UTC, but should show as "30 JAN"
  if (event.startDateTime && event.adminTimezone) {
    const utcDate = new Date(event.startDateTime);
    // Use Intl.DateTimeFormat to get date parts in admin's timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: event.adminTimezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const parts = formatter.formatToParts(utcDate);
    const day = parseInt(parts.find(p => p.type === 'day').value);
    const month = parts.find(p => p.type === 'month').value.toUpperCase();
    
    return { day, month };
  }
  
  // Fallback: use startDate (legacy field) which is always midnight UTC on the selected date
  if (event.startDate) {
    const date = new Date(event.startDate);
    return {
      day: date.getUTCDate(),
      month: date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
    };
  }
  
  // Last fallback: use startDateTime as UTC (for events without adminTimezone)
  if (event.startDateTime) {
    const date = new Date(event.startDateTime);
    return {
      day: date.getUTCDate(),
      month: date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
    };
  }
  
  return { day: 0, month: 'N/A' };
}

// Helper to format time properly - use startDateTime/endDateTime
function formatEventTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  // Show time in local timezone
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit'
  });
}

// Transform calendar events object to flat array and sort (same as EventListing)
function groupAndSortEvents(eventsObject) {
  if (!eventsObject || typeof eventsObject !== 'object') {
    return [];
  }

  // Flatten events from all dates into a single array
  // Deduplicate by event ID (cross-midnight events appear in multiple date groups)
  const allEvents = [];
  const seenEventIds = new Set();
  
  Object.values(eventsObject).forEach(dateEvents => {
    if (Array.isArray(dateEvents)) {
      dateEvents.forEach(event => {
        const eventId = event._id?.toString() || event.id?.toString();
        if (eventId && !seenEventIds.has(eventId)) {
          seenEventIds.add(eventId);
          allEvents.push(event);
        }
      });
    }
  });

  if (allEvents.length === 0) {
    return [];
  }

  // Sort events by date first, then by time
  // Date should be in admin's timezone (if available) to match the date badge display
  const sortedEvents = [...allEvents].sort((a, b) => {
    // Helper to get date string for sorting (in admin's timezone if available)
    const getDateString = (event) => {
      // If we have startDateTime and adminTimezone, convert to admin's timezone to get the correct date
      if (event.startDateTime && event.adminTimezone) {
        const utcDate = new Date(event.startDateTime);
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: event.adminTimezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const parts = formatter.formatToParts(utcDate);
        const year = parts.find(p => p.type === 'year').value;
        const month = parts.find(p => p.type === 'month').value;
        const day = parts.find(p => p.type === 'day').value;
        return `${year}-${month}-${day}`;
      }
      // Fallback: use startDate (legacy field) which is the date the admin selected
      if (event.startDate) {
        const date = new Date(event.startDate);
        return date.toISOString().split('T')[0];
      }
      // Last fallback: use startDateTime as UTC date
      if (event.startDateTime) {
        const date = new Date(event.startDateTime);
        return date.toISOString().split('T')[0];
      }
      return '';
    };
    
    // Get UTC timestamp for time sorting
    const getTimestamp = (event) => {
      if (event.startDateTime) return new Date(event.startDateTime).getTime();
      if (event.startTime) return new Date(event.startTime).getTime();
      if (event.startDate) return new Date(event.startDate).getTime();
      return 0;
    };
    
    // First, sort by date (in admin's timezone)
    const dateA = getDateString(a);
    const dateB = getDateString(b);
    
    if (dateA !== dateB) {
      return dateA.localeCompare(dateB);
    }
    
    // If dates are the same, sort by time (using UTC timestamp)
    const timeA = getTimestamp(a);
    const timeB = getTimestamp(b);
    return timeA - timeB;
  });

  return sortedEvents;
}

const UpComingEvents = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  const containerRef = useRef(null);

  // Get current month/year for calendar API
  const currentDate = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }, []);

  const { data: calendarEventsData, isLoading, error } = useGetCalendarEventsForListingQuery(
    {
      view: 'month',
      fromDate: currentDate,
      isUpcoming: true, // Only show upcoming events from today onwards
      showAllFuture: true, // Show events from current and next month
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Transform and sort events, then limit to 10
  const events = useMemo(() => {
    if (!calendarEventsData?.events) {
      return [];
    }

    // Transform calendar events object to sorted array
    let allEvents = groupAndSortEvents(calendarEventsData.events);
    
    // Ensure allEvents is always an array
    if (!Array.isArray(allEvents)) {
      allEvents = [];
    }
    
    // Show all events (no limit)

    return allEvents.map((event) => {
      const localDate = getLocalDateParts(event);
      
      // Determine host display based on userType
      let hostDisplay;
      // Handle host field for both venue and performer events (could be string or array)
      const hostValue = Array.isArray(event.host) ? event.host.join(', ') : event.host;
      const fullHostDisplay = `Hosted By ${hostValue || 'N/A'}`;
      hostDisplay = fullHostDisplay;
      
      // Limit to 20 characters
      const truncatedHost = hostDisplay.length > 20 ? hostDisplay.substring(0, 20) + '...' : hostDisplay;
      
      // Determine location display
      let locationDisplay;
      if (event.address && event.address.trim() !== '') {
        locationDisplay = event.address;
      } else if (event.userType === "venue" && event.user?.name) {
        locationDisplay = event.user.name;
      } else {
        locationDisplay = 'Location TBA';
      }
      
      // Use startDateTime/endDateTime (primary fields) if available, fallback to legacy fields
      const startTime = event.startDateTime || event.startTime;
      const endTime = event.endDateTime || event.endTime;
      
      return {
        id: event._id,
        image: event.image || "/home/upcomping/upcoming.png",
        date: localDate.day,
        month: localDate.month,
        title: event.title,
        host: truncatedHost,
        fullHost: fullHostDisplay,
        time: `Start ${formatEventTime(startTime)} - ${formatEventTime(endTime)}`,
        location: locationDisplay,
        featured: event.type === 'drag-show'
      };
    });
  }, [calendarEventsData]);

  // Add scroll event listener to update active slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !events.length) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const handleScroll = () => {
        const cards = container.querySelectorAll('.flex-shrink-0');
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth;
        const spacing = 24; // space-x-6 = 24px
        const totalCardWidth = cardWidth + spacing;
        const scrollLeft = container.scrollLeft;
        const newActiveSlide = Math.round(scrollLeft / totalCardWidth);
        setActiveSlide(newActiveSlide);
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [events]);

  const scrollTo = (index) => {
    setActiveSlide(index);
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.flex-shrink-0');
      if (cards.length === 0) return;
      
      const cardWidth = cards[0].offsetWidth;
      const spacing = 24; // space-x-6 = 24px
      const scrollPosition = index * (cardWidth + spacing);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return <div className="col-span-full flex mt-16 justify-center min-h-[300px]">
    <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
  </div>;
  if (error) return <div className="text-white text-center py-12">Error loading events</div>;

  return (
    <div className="relative py-12 px-4 md:px-8 text-white">
      {/* Background Pattern - Using CSS pattern for now */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,0,162,0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <h2 className="font-['Space_Grotesk'] font-normal text-lg leading-none text-center align-middle uppercase">
              UPCOMING EVENTS
            </h2>
          </div>

          <div className="flex flex-col items-end w-full">
            <Link
              to="/events"
              className="font-['Space_Grotesk'] text-[#FF00A2] text-base mb-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              VIEW ALL
            </Link>
            <Link to="/calendar">
              <img src="/home/eventlisting/calendar.png" alt="calendar" />
            </Link>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none text-center align-middle capitalize mb-10">
          Don't Miss These Upcoming Events!
        </h1>

        {/* Cards Container */}
        <div className="relative overflow-hidden">
          {/* Cards Scrollable Area */}
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto hide-scrollbar py-4 md:px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event, index) => (
              <div
                key={event.id}
                className={`flex-shrink-0 w-[320px] md:w-[567px] h-[381px] relative ${
                  activeSlide === index ? "z-10" : "opacity-80"
                }`}
              >
                {/* Event Card */}
                <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                  {/* Image */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Pink vertical accent line */}
                  <div className="absolute top-0 left-0 bottom-0 w-[6px] bg-[#FF00A2]"></div>

                  {/* Date Badge */}
                  <div className="absolute top-[13px] left-[16px] bg-[#FF00A2] rounded-full w-[66px] h-[66px] flex flex-col items-center justify-center">
                    <span className="font-['Space_Grotesk'] font-bold text-2xl">
                      {event.date}
                    </span>
                    <span className="font-['Space_Grotesk'] text-sm uppercase">
                      {event.month}
                    </span>
                  </div>

                  {/* Card Content - semi-transparent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
                    {/* Content container positioned in the middle-right - MODIFIED SIZE */}
                    <div className="absolute bg-black/60 top-24 md:top-28 right-4 md:right-12 rounded-lg bottom-4 md:bottom-8 left-20 md:left-32 p-3 md:p-5 backdrop-blur">
                      <img
                        src="/home/upcomping/crown.png"
                        alt="crown"
                        className="absolute -right-4 -top-4 md:-top-7 w-[24px] h-[24px] md:w-[36px] md:h-[36px]"
                      />
                      <h3 className="font-['Space_Grotesk'] font-bold text-base md:text-2xl mb-1 text-white truncate">
                        {event.title.length > 25 ? event.title.substring(0, 25) + '...' : event.title}
                      </h3>
                      <div className="relative">
                        <p 
                          className="font-['Space_Grotesk'] text-xs md:text-base mb-1 md:mb-4 text-white cursor-help"
                          onMouseEnter={() => setVisibleTooltip(event.id)}
                          onMouseLeave={() => setVisibleTooltip(null)}
                        >
                          {event.host.length > 35 ? event.host.substring(0, 35) + '...' : event.host}
                        </p>
                        
                        {/* Tooltip */}
                        {visibleTooltip === event.id && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap z-50 max-w-xs">
                            {event.fullHost}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center mb-1 md:mb-2">
                        <span className="text-[#FF00A2] mr-1 md:mr-2 text-sm md:text-lg">
                          ⏰
                        </span>
                        <span className="font-['Space_Grotesk'] text-xs md:text-sm text-white">
                          {event.time}
                        </span>
                      </div>

                      <div className="flex items-center mb-2 md:mb-6">
                        <span className="text-[#FF00A2] mr-1 md:mr-2 text-sm md:text-lg">
                          📍
                        </span>
                        <span className="font-['Space_Grotesk'] text-xs md:text-sm text-white">
                          {event.location.length > 25 ? event.location.substring(0, 25) + '...' : event.location}
                        </span>
                      </div>

                      {/* Card Actions */}
                      <div className="flex mt-auto space-x-1 md:space-x-2">
                        <Link to={`/event-detail/${event.id}`}>
                          <button 
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                            className="w-[80px] md:w-[120px] h-[28px] md:h-[40px] bg-[#FF00A2] border-[#FF00A2] border-2 rounded-l-full text-white font-['Space_Grotesk'] text-[10px] md:text-sm uppercase hover:bg-pink-600 transition"
                          >
                            VIEW DETAILS
                          </button>
                        </Link>

                        <Link to="/events">
                          <button onClick={() => {
                              window.scrollTo(0, 0);
                            }}  className="w-[80px] md:w-[120px] h-[28px] md:h-[40px] border-2 border-[#FF00A2] rounded-r-full text-[#FF00A2] font-['Space_Grotesk'] text-[10px] md:text-sm uppercase hover:bg-pink-600 hover:text-white transition">
                            VIEW ALL
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))
            ) : null}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.isArray(events) ? events.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-[10px] h-[10px] rounded-full ${
                activeSlide === index ? "bg-[#FF00A2]" : "bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )) : null}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UpComingEvents;
