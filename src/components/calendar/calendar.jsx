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
    skip: currentView !== Views.MONTH
  });

  // Filter events based on current view
  const events = useMemo(() => {
    if (!monthEvents.length) return [];

    // Convert date strings to Date objects for Big Calendar
    const eventsWithDates = monthEvents.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));

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
  }, [monthEvents, currentView, currentDate]);

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
          <button type="button" onClick={goToCurrent} className="px-4 py-2">Today</button>
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
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => onView(Views.WEEK)}
            className={`px-4 py-2 m-1 ${view === Views.WEEK ? 'rbc-active' : ''}`}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => onView(Views.DAY)}
            className={`px-4 py-2 m-1 ${view === Views.DAY ? 'rbc-active' : ''}`}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => onView(Views.AGENDA)}
            className={`px-4 py-2 m-1 ${view === Views.AGENDA ? 'rbc-active' : ''}`}
          >
            List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-12">
      <div className="calendar-container overflow-x-auto" style={{ height: 700, position: 'relative', minWidth: '100%' }}>
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
          onView={setCurrentView}
          date={currentDate}
          onNavigate={date => setCurrentDate(date)}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          popup={true}
          onShowMore={(events, date) => setShowModal(true)}
          onSelectEvent={event => navigate(`/event-detail/${event.id}`)}
          components={{
            toolbar: CustomToolbar
          }}
          style={{
            margin: '20px',
            padding: '20px',
            minWidth: currentView === Views.MONTH ? '768px' : 
                     currentView === Views.WEEK ? '1024px' : '100%',
            maxWidth: currentView === Views.WEEK ? '1200px' : 'none',
            backgroundColor: 'transparent'
          }}
          min={new Date(0, 0, 0, 6, 0, 0)} // Start at 6 AM
          max={new Date(0, 0, 0, 20, 0, 0)} // End at 8 PM
          tooltipAccessor={event => event.desc}
          formats={{
            monthHeaderFormat: 'MMMM YYYY',
            weekHeaderFormat: 'MMMM D YYYY',
            dayHeaderFormat: 'dddd • MMMM D, YYYY',
            dayRangeHeaderFormat: ({ start, end }) => 
              `${moment(start).format('MMMM D')} - ${moment(end).format('D, YYYY')}`,
            agendaHeaderFormat: ({ start, end }) =>
              `${moment(start).format('MMMM D')} - ${moment(end).format('D, YYYY')}`,
            agendaDateFormat: 'ddd D MMM',
            agendaTimeFormat: 'HH:mm',
            agendaTimeRangeFormat: ({ start, end }) =>
              `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
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
      `}</style>
    </div>
  )
}

export default Calendar
