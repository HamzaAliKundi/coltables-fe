import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ page, limit, type }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        // params.append('sort', -1);
        if (type) params.append('type', type);
        return `/api/user/event/get-all-events?${params.toString()}`;
      },
    }),

    getSingleEventById: builder.query({
      query: (id) => `/api/user/event/get-single-event/${id}`,
    }),
  }),
});

export const { useGetAllEventsQuery, useGetSingleEventByIdQuery } = eventsApi;
