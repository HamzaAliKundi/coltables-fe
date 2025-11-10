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
      query: ({ page = 1, limit = 10, search, type, sort = -1, address, isUpcoming = 1 }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        params.append('sort', sort);
        if (address) params.append('address', address);
        if (type) params.append('type', type);
        if (search) params.append('search', search);
        if (isUpcoming !== undefined && isUpcoming !== null) {
          const normalizedUpcoming = Number(isUpcoming) ? 1 : 0;
          params.append('isUpcoming', normalizedUpcoming);
        }
        return `/api/user/event/get-all-events?${params.toString()}`;
      },
    }),

    getSingleEventById: builder.query({
      query: (id) => `/api/user/event/get-single-event/${id}`,
    }),

    getUpcomingEvents: builder.query({
      query: ({ page = 1, limit = 10, sort = -1 }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        params.append('sort', sort);
        params.append('isUpcoming', 1);
        return `/api/user/event/get-all-events?${params.toString()}`;
      },
    }),

    getCalendarEvents: builder.query({
      query: ({ view, fromDate, userId, userType }) => {
        const params = new URLSearchParams();
        params.append('view', view || 'month');
        params.append('fromDate', fromDate);
        if (userId) params.append('userId', userId);
        if (userType) params.append('userType', userType);
        
        return `/api/user/event/get-calendar-events?${params.toString()}`;
      },
      transformResponse: (response) => {
        // Transform from { events: { "YYYY-MM-DD": [...] } } to { eventDates: { "YYYY-MM": { "DD": { eventDetails: [...] } } } }
        if (!response?.events) {
          return { eventDates: {} };
        }

        const eventDates = {};
        
        // Handle month/week view - events grouped by date
        if (response.view === 'month' || response.view === 'week') {
          Object.entries(response.events).forEach(([dateKey, events]) => {
            const [year, month, day] = dateKey.split('-');
            const monthKey = `${year}-${month}`;
            const dayStr = day.padStart(2, '0');
            
            if (!eventDates[monthKey]) {
              eventDates[monthKey] = {};
            }
            if (!eventDates[monthKey][dayStr]) {
              eventDates[monthKey][dayStr] = { eventDetails: [] };
            }
            
            // Events are already sorted by the API, just add them
            eventDates[monthKey][dayStr].eventDetails.push(...events);
          });
        } 
        // Handle day view - events as array
        else if (response.view === 'day') {
          // For day view, we need to group by the date
          if (Array.isArray(response.events)) {
            response.events.forEach(event => {
              const date = new Date(event.startDate);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const monthKey = `${year}-${month}`;
              
              if (!eventDates[monthKey]) {
                eventDates[monthKey] = {};
              }
              if (!eventDates[monthKey][day]) {
                eventDates[monthKey][day] = { eventDetails: [] };
              }
              
              eventDates[monthKey][day].eventDetails.push(event);
            });
          }
        }
        
        return { eventDates };
      },
    }),

    getBigCalendarEvents: builder.query({
      query: ({ view, fromDate }) => {
        const params = new URLSearchParams();
        params.append('view', view);
        params.append('fromDate', fromDate);
        return `/api/user/event/get-calendar-events?${params.toString()}`;
      },
      transformResponse: (response) => {
        if (!response?.events) return [];
        
        const transformedEvents = [];
        Object.entries(response.events).forEach(([, events]) => {
          events.forEach(event => {
            // Combine startDate with startTime
            const startDate = new Date(event.startDate);
            const startTime = new Date(event.startTime);
            // Set the time from startTime to startDate
            startDate.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
            // Use the same for end (single point event)
            const endDate = new Date(startDate);
            
            transformedEvents.push({
              id: event._id,
              title: event.title,
              start: startDate,
              end: endDate,
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
      query: ({ view = 'month', fromDate, isUpcoming = 1 }) => {
        const params = new URLSearchParams();
        params.append('view', view);
        params.append('fromDate', fromDate);
        if (isUpcoming !== undefined && isUpcoming !== null) {
          const normalizedUpcoming = Number(isUpcoming) ? 1 : 0;
          params.append('isUpcoming', normalizedUpcoming);
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
