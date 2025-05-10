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
      query: ({ page = 1, limit = 10, type, sort = -1, address, isUpcoming = 1 }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        params.append('sort', sort);
        if (address) params.append('address', address);
        if (type) params.append('type', type);
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
        return `/api/user/event/get-calendar-events?${params.toString()}`;
      },
      transformResponse: (response) => {
        if (!response?.events) return [];
        
        const transformedEvents = [];
        Object.entries(response.events).forEach(([date, events]) => {
          events.forEach(event => {
            transformedEvents.push({
              id: event._id,
              title: event.title,
              start: event.startTime,
              end: event.endTime,
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

  }),
});

export const { 
  useGetAllEventsQuery, 
  useGetSingleEventByIdQuery,
  useGetUpcomingEventsQuery,
  useLazyGetSingleEventByIdQuery, 
  useGetCalendarEventsQuery,
  useGetBigCalendarEventsQuery,
} = eventsApi;
