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
      query: ({ page = 1, limit = 10, type, sort = -1, isUpcoming = 1 }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        params.append('sort', sort);
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

  }),
});

export const { 
  useGetAllEventsQuery, 
  useGetSingleEventByIdQuery,
  useGetUpcomingEventsQuery,
  useLazyGetSingleEventByIdQuery, 
  useGetCalendarEventsQuery,
} = eventsApi;
