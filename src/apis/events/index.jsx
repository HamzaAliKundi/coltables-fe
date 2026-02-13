import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ page = 1, limit = 10, search, type, sort = -1, address, isUpcoming }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        params.append('sort', sort);
        if (address) params.append('address', address);
        if (type) params.append('type', type);
        if (search) params.append('search', search);
        if (isUpcoming !== undefined) params.append('isUpcoming', isUpcoming);
        return `/api/user/event/get-all-events?${params.toString()}`;
      },
    }),

    getSingleEventById: builder.query({
      query: (id) => `/api/user/event/get-single-event/${id}`,
    }),

    getUpcomingEvents: builder.query({
      query: ({ page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        params.append('isUpcoming', 1);
        return `/api/user/event/get-all-events?${params.toString()}`;
      },
    }),

    getCalendarEvents: builder.query({
      query: ({ view, fromDate, userId, userType }) => {
        const params = new URLSearchParams();
        params.append('userId', userId);
        params.append('userType', userType);
        
        if (view === 'month') {
          const [year, month] = fromDate.split('-');
          params.append('month', `${year}-${month}`);
        } else if (view === 'day') {
          params.append('date', fromDate);
        } else {
          // For week view, we'll use the start date
          params.append('date', fromDate);
        }
        
        return `/api/user/event/get-events-by-date?${params.toString()}`;
      },
    }),

    getBigCalendarEvents: builder.query({
      query: ({ view, fromDate }) => {
        const params = new URLSearchParams();
        params.append('view', view);
        params.append('fromDate', fromDate);
        
        // Get viewer timezone from browser (critical for correct date grouping)
        const viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        params.append('viewerTimezone', viewerTimezone);
        
        return `/api/user/event/get-calendar-events?${params.toString()}`;
      },
      transformResponse: (response) => {
        if (!response?.events) return [];
        
        const transformedEvents = [];
        const seenIds = new Set(); // Deduplicate: multi-day events appear in multiple date buckets
        Object.values(response.events).forEach((events) => {
          events.forEach(event => {
            const eventId = event._id?.toString?.() || event._id;
            if (seenIds.has(eventId)) return;
            seenIds.add(eventId);

            // Use startDateTime and endDateTime (primary fields) - fallback to legacy for backward compatibility
            const startDateTime = event.startDateTime ? new Date(event.startDateTime) : null;
            const endDateTime = event.endDateTime ? new Date(event.endDateTime) : null;
            
            let start = startDateTime;
            let end = endDateTime;
            
            // Fallback: combine startDate with startTime for legacy events
            if (!start && event.startDate && event.startTime) {
              const startDate = new Date(event.startDate);
              const startTime = new Date(event.startTime);
              startDate.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
              start = startDate;
              end = end || new Date(startDate);
            } else if (!start && event.startDate) {
              start = new Date(event.startDate);
              end = end || new Date(event.startDate);
            }
            
            if (!start) return;
            
            transformedEvents.push({
              id: event._id,
              title: event.title,
              start: start,
              end: end || start,
              startDateTime: startDateTime || start,
              endDateTime: endDateTime || end || start,
              desc: event.description,
              host: event.host,
              type: event.type,
              image: event.image,
              isPrivate: event.isPrivate,
              status: event.status,
              user: event.user,
              userType: event.userType,
              performersList: event.performersList,
              venuesList: event.venuesList,
              audienceType: event.audienceType,
              eventCategory: event.eventCategory,
              specialRequirements: event.specialRequirements
            });
          });
        });
        return transformedEvents;
      }
    }),

    getCalendarEventsForListing: builder.query({
      query: ({ view = 'month', fromDate, isUpcoming, userId, userType, showAllFuture }) => {
        const params = new URLSearchParams();
        params.append('view', view);
        params.append('fromDate', fromDate);
        
        // Get viewer timezone from browser (critical for correct date grouping)
        // This ensures events appear on the correct calendar date for the viewer
        const viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        params.append('viewerTimezone', viewerTimezone);
        
        if (isUpcoming) {
          params.append('isUpcoming', '1');
        }
        if (userId) {
          params.append('userId', userId);
        }
        if (userType) {
          params.append('userType', userType);
        }
        if (showAllFuture) {
          params.append('showAllFuture', '1');
        }
        return `/api/user/event/get-calendar-events?${params.toString()}`;
      },
    }),

  }),
});

export const { 
  useGetAllEventsQuery, 
  useGetSingleEventByIdQuery,
  useGetUpcomingEventsQuery,
  useLazyGetSingleEventByIdQuery, 
  useGetCalendarEventsQuery,
  useGetBigCalendarEventsQuery,
  useGetCalendarEventsForListingQuery,
} = eventsApi;
