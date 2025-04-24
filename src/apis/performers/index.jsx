import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const performersApi = createApi({
  reducerPath: "performersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPerformers: builder.query({
      query: ({ page, limit }) =>
        `/api/user/performer/get-all-performers?limit=${limit}&page=${page}&sort=-1`,
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
  }),
});

export const {
  useGetAllPerformersQuery,
  useGetSingleVenueByIdQuery,
  useUpdateVenueProfileMutation,
} = performersApi;
