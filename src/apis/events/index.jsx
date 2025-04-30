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
      query: ({ page, limit }) =>
        `/api/user/event/get-all-events?limit=${limit}&page=${page}&sort=-1`,
    }),

    getSingleEventById: builder.query({
      query: (id) => `/api/user/event/get-single-event/${id}`,
    }),

    // updateVenueProfile: builder.mutation({
    //   query: ({ data }) => ({
    //     url: `auth/user/update-profile`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetAllEventsQuery, useGetSingleEventByIdQuery } = eventsApi;
