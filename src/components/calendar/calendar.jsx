import React, { useState, useMemo } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { useGetBigCalendarEventsQuery } from '../../apis/events'
import { useNavigate } from 'react-router-dom'

// Set up moment locale and localizer
moment.locale('en-GB')
const localizer = momentLocalizer(moment)

const Calendar = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [currentView, setCurrentView] = useState(Views.MONTH)
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Get events from API only for month view
  const { data: monthEvents = [], isLoading } = useGetBigCalendarEventsQuery({
    view: 'month',
    fromDate: moment(currentDate).format('YYYY-MM')
  }, {
    skip: currentView !== Views.MONTH,
    transformResponse: (response) => {
      return response.map(event => ({
        ...event,
        start: moment(event.start).toISOString(),
        end: moment(event.end).toISOString()
      }));
    }
  });

  // Helper to add +1 day to a date string (ISO format)
  function addOneDay(dateString) {
    const date = new Date(dateString);
    date.setUTCDate(date.getUTCDate() + 1);
    return date;
  }

  // Ensure all events have startDateTime and endDateTime for display and logic
  // For cross-midnight events: show only on start date by truncating end to end-of-start-day
  // Additionally, hide events before 11 Feb 2026 on the public calendar.
  const safeMonthEvents = useMemo(() => {
    if (!monthEvents) return [];

    // Cutoff date: only show events on/after 11 Feb 2026
    const cutoffDate = new Date('2026-02-11T00:00:00');
    
    return monthEvents.map(event => {
      // Prefer startDateTime and endDateTime (primary fields)
      const startDT = event.startDateTime || event.start;
      const endDT = event.endDateTime || event.end || event.start;
      
      let startDate = new Date(startDT);
      let endDate = new Date(endDT);
      
      // Fallback: combine startDate + startTime for legacy events
      if (!event.startDateTime && (event.startDate || event.startTime)) {
        const dateFromStart = event.startDate ? new Date(event.startDate) : startDate;
        const timeFromStart = event.startTime ? new Date(event.startTime) : startDate;
        dateFromStart.setUTCHours(
          timeFromStart.getUTCHours(),
          timeFromStart.getUTCMinutes(),
          timeFromStart.getUTCSeconds()
        );
        return {
          ...event,
          start: dateFromStart.toISOString(),
          end: dateFromStart.toISOString(),
          startDateTime: dateFromStart,
          endDateTime: dateFromStart,
          originalStartTime: event.startTime || event.start
        };
      }

      // If event spans multiple calendar days (e.g. 19 Jan 10pm - 20 Jan 2am),
      // truncate end to end-of-start-day so it shows only on start date in the grid
      const originalEndDate = new Date(endDT);
      const startDay = moment(startDate).format('YYYY-MM-DD');
      const endDay = moment(endDate).format('YYYY-MM-DD');
      if (startDay !== endDay) {
        endDate = moment(startDate).endOf('day').toDate();
      }
      
      return {
        ...event,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        startDateTime: startDate,
        endDateTime: endDate,
        originalEndDateTime: originalEndDate, // Keep for tooltip/time display
        originalStartTime: startDT
      };
    }).filter(event => {
      const start = event.startDateTime || new Date(event.start);
      return start >= cutoffDate;
    });
  }, [monthEvents]);

  // Filter events based on current view - sort by startDateTime, then endDateTime
  const events = useMemo(() => {
    if (!safeMonthEvents.length) return [];

    // Sort by startDateTime first, then endDateTime (for events starting at same time)
    const sortedEvents = [...safeMonthEvents].sort((a, b) => {
      const startA = new Date(a.startDateTime || a.start).getTime();
      const startB = new Date(b.startDateTime || b.start).getTime();
      if (startA !== startB) return startA - startB;
      const endA = new Date(a.endDateTime || a.end || a.start).getTime();
      const endB = new Date(b.endDateTime || b.end || b.start).getTime();
      return endA - endB;
    });

    // Convert date strings to Date objects for Big Calendar
    const eventsWithDates = sortedEvents.map(event => {
      // Use startDateTime for the time display
      const eventTime = moment(event.startDateTime || event.originalStartTime || event.start).format('h:mm A');
      const title = event.title
      
      // For month view, add time in a unique way
      let displayTitle = title
      const displayEndTime = event.originalEndDateTime || event.endDateTime || event.end || event.start;
      const endTime = moment(displayEndTime).format('h:mm A');
      const timeRange = eventTime !== endTime ? `${eventTime} - ${endTime}` : eventTime;
      
      if (currentView === Views.MONTH) {
        displayTitle = title.length > 15
          ? `${timeRange} ${title.substring(0, 15)}...`
          : `${timeRange} ${title}`;
      }

      // For agenda view, apply additional timezone fix if needed
      let eventStart = event.start;
      let eventEnd = event.end;
      
      if (currentView === Views.AGENDA) {
        // Use the same logic as month view - no additional adjustments needed
        // The events are already properly adjusted in safeMonthEvents
        eventStart = event.start;
        eventEnd = event.end;
      }

      // Use displayDate for the start date to apply the +1 day increment
      const finalStart = event.displayDate ? new Date(event.displayDate) : new Date(eventStart);
      const finalEnd = new Date(eventEnd);

      const endTimeDisplay = moment(event.originalEndDateTime || event.endDateTime || event.end || event.start).format('h:mm A');
      const tooltipTime = eventTime !== endTimeDisplay ? `${eventTime} - ${endTimeDisplay}` : eventTime;
      
      return {
        ...event,
        start: finalStart,
        end: finalEnd,
        title: displayTitle,
        tooltipContent: `${title}\n${tooltipTime}` // Full info with time range in tooltip
      }
    });

    switch (currentView) {
      case Views.MONTH:
        return eventsWithDates;
      
      case Views.WEEK:
        const weekStart = moment(currentDate).startOf('week');
        const weekEnd = moment(currentDate).endOf('week');
        return eventsWithDates.filter(event => {
          const eventDate = moment(event.start);
          return eventDate.isBetween(weekStart, weekEnd, 'day', '[]');
        });
      
      case Views.DAY:
        const dayStart = moment(currentDate).startOf('day');
        const dayEnd = moment(currentDate).endOf('day');
        return eventsWithDates.filter(event => {
          const eventDate = moment(event.start);
          return eventDate.isBetween(dayStart, dayEnd, 'day', '[]');
        });
      
      case Views.AGENDA:
        // Show all events sorted by date
        return eventsWithDates.sort((a, b) => moment(a.start).diff(moment(b.start)));
      
      default:
        return eventsWithDates;
    }
  }, [safeMonthEvents, currentView, currentDate]);

  // Loading component
  const LoadingComponent = () => (
    <div className="calendar-loading">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p>Loading events...</p>
    </div>
  );
  
  // Custom toolbar component
  const CustomToolbar = ({ onNavigate, onView, view, label }) => {
    const goToBack = () => {
      if (view === Views.MONTH) {
        const newDate = moment(currentDate).subtract(1, 'month')
        setCurrentDate(newDate.toDate())
        onNavigate('PREV')
        return
      }
      let newDate
      switch(view) {
        case Views.WEEK:
          newDate = moment(currentDate).subtract(1, 'week')
          break
        case Views.DAY:
          newDate = moment(currentDate).subtract(1, 'day')
          break
        case Views.AGENDA:
          newDate = moment(currentDate).subtract(1, 'week')
          break
        default:
          newDate = moment(currentDate).subtract(1, 'day')
      }
      setCurrentDate(newDate.toDate())
      onNavigate('PREV')
    }

    const goToNext = () => {
      if (view === Views.MONTH) {
        const newDate = moment(currentDate).add(1, 'month')
        setCurrentDate(newDate.toDate())
        onNavigate('NEXT')
        return
      }
      let newDate
      switch(view) {
        case Views.WEEK:
          newDate = moment(currentDate).add(1, 'week')
          break
        case Views.DAY:
          newDate = moment(currentDate).add(1, 'day')
          break
        case Views.AGENDA:
          newDate = moment(currentDate).add(1, 'week')
          break
        default:
          newDate = moment(currentDate).add(1, 'day')
      }
      setCurrentDate(newDate.toDate())
      onNavigate('NEXT')
    }

    const goToCurrent = () => {
      const newDate = new Date()
      setCurrentDate(newDate)
      onNavigate('TODAY')
    }

    return (
      <div className="rbc-toolbar flex-col md:flex-row">
        {/* Left section - Navigation */}
        <div className="rbc-btn-group w-full md:w-auto flex justify-start mb-4 md:mb-0">
          <button type="button" onClick={goToBack} className="px-4 py-2">Back</button>
          <button type="button" onClick={goToNext} className="px-4 py-2">Next</button>
        </div>

        {/* Center section - Current Date Range */}
        <span className="rbc-toolbar-label text-left md:text-center mb-4 md:mb-0">{label}</span>

        {/* Right section - View Options */}
        <div className="rbc-btn-group view-buttons w-full md:w-auto flex justify-start md:justify-center flex-wrap">
          <button
            type="button"
            onClick={() => onView(Views.MONTH)}
            className={`px-4 py-2 m-1 ${view === Views.MONTH ? 'rbc-active' : ''}`}
            aria-pressed={view === Views.MONTH}
          >
            Month
          </button>
          {/*
          <button
            type="button"
            onClick={() => onView(Views.WEEK)}
            className={`px-4 py-2 m-1 ${view === Views.WEEK ? 'rbc-active' : ''}`}
            aria-pressed={view === Views.WEEK}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => onView(Views.DAY)}
            className={`px-4 py-2 m-1 ${view === Views.DAY ? 'rbc-active' : ''}`}
            aria-pressed={view === Views.DAY}
          >
            Day
          </button>
          */}
          <button
            type="button"
            onClick={() => onView(Views.AGENDA)}
            className={`px-4 py-2 m-1 ${view === Views.AGENDA ? 'rbc-active' : ''}`}
            aria-pressed={view === Views.AGENDA}
          >
            List
          </button>
        </div>
      </div>
    )
  }

  // Custom agenda range: show all days in the current month
  const agendaMonthRange = date => {
    const start = moment(date).startOf('month').toDate();
    const end = moment(date).endOf('month').toDate();
    const days = [];
    let current = moment(start);
    while (current.isSameOrBefore(end, 'day')) {
      days.push(current.toDate());
      current.add(1, 'day');
    }
    return days;
  };

  return (
    <div className="p-4 md:p-8">
      <div className="calendar-container" style={{ height: 700, position: 'relative' }}>
        {isLoading && currentView === Views.MONTH ? (
          <LoadingComponent />
        ) : (
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          step={30}
          timeslots={2}
          defaultView={Views.MONTH}
          view={currentView}
          onView={view => {
            if (view === Views.AGENDA) {
              const firstOfMonth = moment(currentDate).startOf('month').toDate();
              setCurrentDate(firstOfMonth);
              setCurrentView(view);
            } else {
              setCurrentView(view);
            }
          }}
          date={currentDate}
          onNavigate={date => setCurrentDate(date)}
          views={[Views.MONTH, Views.AGENDA]}
          popup={true}
          onShowMore={(events, date) => setShowModal(true)}
          onSelectEvent={event => {
            window.scrollTo(0, 0);
            navigate(`/event-detail/${event.id}`);
          }}
          components={{
            toolbar: CustomToolbar
          }}
          style={{
            backgroundColor: 'transparent',
            minWidth: '800px'
          }}
          min={new Date(0, 0, 0, 6, 0, 0)}
          max={new Date(0, 0, 0, 20, 0, 0)}
          tooltipAccessor={event => event.tooltipContent}
          formats={{
            monthHeaderFormat: 'MMMM YYYY',
            weekHeaderFormat: 'MMMM D YYYY',
            dayHeaderFormat: 'dddd • MMMM D, YYYY',
            dayRangeHeaderFormat: ({ start, end }) => 
              `${moment(start).format('MMMM D')} - ${moment(end).format('MMMM D, YYYY')}`,
            agendaHeaderFormat: ({ start, end }) =>
              `${moment(start).format('MMMM D')} - ${moment(end).format('MMMM D, YYYY')}`,
            agendaDateFormat: (date, culture, localizer) => {
              // Use the same date logic as Month view - show the adjusted date
              return moment(date).format('ddd D MMM');
            },
            agendaTimeFormat: 'h:mm A',
            agendaTimeRangeFormat: ({ start, end }) =>
              `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`,
            timeGutterFormat: 'h:mm A',
            eventTimeRangeFormat: ({ start, end }) => {
              const startStr = moment(start).format('h:mm A');
              const endStr = moment(end).format('h:mm A');
              return startStr !== endStr ? `${startStr} - ${endStr}` : startStr;
            },
          }}
        />
        )}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .calendar-container {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .rbc-toolbar {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .rbc-toolbar .rbc-btn-group {
            margin-bottom: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 0.5rem;
          }
          .rbc-toolbar button {
            margin: 0 !important;
            padding: 8px 16px;
            min-width: 80px;
          }
          .rbc-calendar {
            width: 800px !important;
          }
        }
        .rbc-time-content .rbc-events-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }

        .rbc-time-content .rbc-event {
          position: relative;
          width: 100%;
          left: 0;
          margin-bottom: 5px;
          height: auto;
          top: auto;
          flex-shrink: 0;
        }

        .rbc-time-content .rbc-event-overlaps {
          position: relative;
          width: 100%;
          left: 0;
          margin-bottom: 5px;
          height: auto;
          top: auto;
          flex-shrink: 0;
        }
        .rbc-calendar {
          background-color: transparent !important;
        }
        .rbc-toolbar {
          background-color: transparent !important;
        }
        .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
          background-color: transparent !important;
        }
        .rbc-header {
          background-color: transparent !important;
        }
        .rbc-day-bg {
          background-color: transparent !important;
        }
        .rbc-off-range-bg {
          background-color: rgba(0, 0, 0, 0.1) !important;
        }
        .rbc-today {
          background-color: rgba(255, 0, 162, 0.1) !important;
        }
        .rbc-time-view {
          max-width: 1200px;
          margin: 0 auto;
        }
        .rbc-time-content {
          border-radius: 8px;
        }
        .rbc-timeslot-group {
          min-height: 60px !important;
        }
        .rbc-agenda-view {
          max-height: 500px;
          overflow-y: auto;
        }
        .rbc-agenda-content {
          max-height: 500px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  )
}

export default Calendar