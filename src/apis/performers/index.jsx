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

    getSinglePerformerById: builder.query({
      query: (id) => `/api/user/performer/get-single-performer/${id}`,
    }),
  }),
});

export const { useGetAllPerformersQuery, useGetSinglePerformerByIdQuery } =
  performersApi;
