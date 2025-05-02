import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const venuesApi = createApi({
  reducerPath: "venuesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllVenues: builder.query({
      query: ({ page, limit }) =>
        `/api/user/venue/get-all-venues?limit=${limit}&page=${page}&sort=-1`,
    }),

    getSingleVenueById: builder.query({
      query: (id) => `/api/user/venue/get-single-venue/${id}`,
    }),

    updateVenueProfile: builder.mutation({
      query: ({ data }) => ({
        url: `auth/user/update-profile`,
        method: "PATCH",
        body: data,
      }),
    }),

    getEventsByDate: builder.query({
      query: ({ userId, userType, month }) => 
        `/api/user/event/get-events-by-date?userId=${userId}&userType=${userType}&month=${month}`,
    }),

  }),
});

export const {
  useGetAllVenuesQuery,
  useGetSingleVenueByIdQuery,
  useUpdateVenueProfileMutation,
  useGetEventsByDateQuery,
} = venuesApi;
