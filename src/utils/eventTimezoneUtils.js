/**
 * Frontend utility for handling event timezone conversion and grouping
 * 
 * CRITICAL: Backend returns events with UTC datetimes only.
 * Frontend converts UTC → viewer timezone for display and grouping.
 * 
 * Usage:
 *   import { groupEventsByDate, formatEventTime } from './utils/eventTimezoneUtils';
 *   
 *   const grouped = groupEventsByDate(events, 'America/New_York');
 *   const displayTime = formatEventTime(event.startDateTime, 'America/New_York');
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Get viewer's timezone from browser
 * @returns {string} IANA timezone identifier (e.g., "America/New_York")
 */
export function getViewerTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    return 'UTC';
  }
}

/**
 * Convert UTC datetime to viewer's local datetime
 * @param {Date|string} utcDateTime - UTC datetime from backend
 * @param {string} viewerTimezone - IANA timezone identifier
 * @returns {dayjs.Dayjs|null} Viewer-local datetime or null if invalid
 */
export function toViewerLocal(utcDateTime, viewerTimezone) {
  if (!utcDateTime) return null;
  
  try {
    const utcDT = dayjs.utc(utcDateTime);
    if (!utcDT.isValid()) return null;
    
    return utcDT.tz(viewerTimezone);
  } catch (error) {
    console.error('Error converting to viewer local time:', error);
    return null;
  }
}

/**
 * Get all calendar dates (YYYY-MM-DD) that an event overlaps in viewer timezone
 * Handles cross-midnight events correctly
 * 
 * @param {Object} event - Event object with startDateTime and endDateTime (UTC)
 * @param {string} viewerTimezone - IANA timezone identifier
 * @returns {Array<string>} Array of date strings (YYYY-MM-DD)
 */
export function getEventOverlapDates(event, viewerTimezone) {
  const startDT_viewer = toViewerLocal(event.startDateTime, viewerTimezone);
  const endDT_viewer = toViewerLocal(event.endDateTime, viewerTimezone);
  
  if (!startDT_viewer || !endDT_viewer || !startDT_viewer.isValid() || !endDT_viewer.isValid()) {
    return [];
  }
  
  // Validate: end must be after start
  if (endDT_viewer.isBefore(startDT_viewer)) {
    return [];
  }
  
  // Extract viewer-local dates
  const startDate_viewer = startDT_viewer.startOf('day');
  const endDate_viewer = endDT_viewer.startOf('day');
  
  // Generate all dates from start to end (inclusive)
  const dates = [];
  let currentDate = startDate_viewer;
  const endDateValue = endDate_viewer.valueOf();
  
  while (currentDate.valueOf() <= endDateValue) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  
  return dates;
}

/**
 * Group events by viewer-local date
 * Handles cross-midnight events correctly (appears on multiple dates)
 * 
 * @param {Array} events - Array of event objects with startDateTime/endDateTime (UTC)
 * @param {string} viewerTimezone - IANA timezone identifier (defaults to browser timezone)
 * @returns {Object} { "YYYY-MM-DD": [event1, event2, ...] }
 */
export function groupEventsByDate(events, viewerTimezone = null) {
  if (!Array.isArray(events)) {
    return {};
  }
  
  const tz = viewerTimezone || getViewerTimezone();
  const grouped = {};
  const eventMetadata = new Map(); // Store viewer-local start time for sorting
  
  events.forEach(event => {
    // Skip events without valid UTC fields
    if (!event.startDateTime || !event.endDateTime) {
      return;
    }
    
    // Get all dates this event overlaps in viewer timezone
    const dates = getEventOverlapDates(event, tz);
    
    if (dates.length === 0) {
      return;
    }
    
    // Get viewer-local start time for sorting
    const viewerLocalStart = toViewerLocal(event.startDateTime, tz);
    if (viewerLocalStart && viewerLocalStart.isValid()) {
      eventMetadata.set(event._id?.toString() || event.id, {
        viewerLocalStartTimestamp: viewerLocalStart.valueOf(),
        viewerLocalStart
      });
    }
    
    // Assign event to all overlapping dates
    dates.forEach(dateKey => {
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
  });
  
  // Sort events within each date group by viewer-local start time
  Object.keys(grouped).forEach(dateKey => {
    grouped[dateKey].sort((a, b) => {
      const metadataA = eventMetadata.get(a._id?.toString() || a.id);
      const metadataB = eventMetadata.get(b._id?.toString() || b.id);
      
      if (metadataA && metadataB) {
        return metadataA.viewerLocalStartTimestamp - metadataB.viewerLocalStartTimestamp;
      }
      
      // Fallback: use UTC timestamp
      const timestampA = metadataA?.viewerLocalStartTimestamp || 
        (a.startDateTime ? dayjs.utc(a.startDateTime).valueOf() : 0);
      const timestampB = metadataB?.viewerLocalStartTimestamp || 
        (b.startDateTime ? dayjs.utc(b.startDateTime).valueOf() : 0);
      
      return timestampA - timestampB;
    });
  });
  
  return grouped;
}

/**
 * Format event datetime for display in viewer timezone
 * @param {Date|string} utcDateTime - UTC datetime from backend
 * @param {string} viewerTimezone - IANA timezone identifier
 * @param {string} format - dayjs format string (default: 'MMM D, YYYY h:mm A')
 * @returns {string} Formatted datetime string
 */
export function formatEventTime(utcDateTime, viewerTimezone = null, format = 'MMM D, YYYY h:mm A') {
  const tz = viewerTimezone || getViewerTimezone();
  const viewerLocal = toViewerLocal(utcDateTime, tz);
  
  if (!viewerLocal || !viewerLocal.isValid()) {
    return 'Invalid date';
  }
  
  return viewerLocal.format(format);
}

/**
 * Check if event is currently active (happening right now)
 * @param {Object} event - Event object with startDateTime and endDateTime (UTC)
 * @returns {boolean} True if event is currently active
 */
export function isEventActive(event) {
  if (!event.startDateTime || !event.endDateTime) {
    return false;
  }
  
  const now = dayjs.utc();
  const start = dayjs.utc(event.startDateTime);
  const end = dayjs.utc(event.endDateTime);
  
  return now >= start && now <= end;
}

/**
 * Check if event is upcoming (hasn't started yet)
 * @param {Object} event - Event object with startDateTime and endDateTime (UTC)
 * @returns {boolean} True if event is upcoming
 */
export function isEventUpcoming(event) {
  if (!event.startDateTime) {
    return false;
  }
  
  const now = dayjs.utc();
  const start = dayjs.utc(event.startDateTime);
  
  return start > now;
}

/**
 * Check if event has ended
 * @param {Object} event - Event object with startDateTime and endDateTime (UTC)
 * @returns {boolean} True if event has ended
 */
export function isEventEnded(event) {
  if (!event.endDateTime) {
    return false;
  }
  
  const now = dayjs.utc();
  const end = dayjs.utc(event.endDateTime);
  
  return end < now;
}

/**
 * Filter events that are currently visible (haven't ended yet)
 * @param {Array} events - Array of event objects
 * @returns {Array} Filtered array of visible events
 */
export function filterVisibleEvents(events) {
  if (!Array.isArray(events)) {
    return [];
  }
  
  return events.filter(event => {
    // Event is visible if it hasn't ended yet
    return !isEventEnded(event);
  });
}

/**
 * Filter upcoming events (haven't started yet)
 * @param {Array} events - Array of event objects
 * @returns {Array} Filtered array of upcoming events
 */
export function filterUpcomingEvents(events) {
  if (!Array.isArray(events)) {
    return [];
  }
  
  return events.filter(event => isEventUpcoming(event));
}

