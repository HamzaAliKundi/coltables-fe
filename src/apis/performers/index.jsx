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
      query: ({ page, limit, search }) =>
        `/api/user/performer/get-all-performers?limit=${limit}&page=${page}&sort=-1&search=${search}`,
    }),

    getSinglePerformerById: builder.query({
      query: (id) => `/api/user/performer/get-single-performer/${id}`,
    }),

    getPerformerReviews: builder.query({
      query: (performerId) => `/api/user/review/performer/get-single-performer/${performerId}`,
    }),

    getAllReviews: builder.query({
      query: ({ page, limit, userId }) =>
        `/api/user/review/get-all-reviews?limit=${limit}&page=${page}&userId=${userId}`,
    }),

    addPerformerReview: builder.mutation({
      query: ({ performerId, reviewData }) => ({
        url: `api/user/review/add-review`,
        method: 'POST',
        body: {
          performerId,
          name: reviewData.name,
          description: reviewData.description,
          rating: reviewData.rating
        },
      }),
    }),
  }),
});

export const { 
  useGetAllPerformersQuery, 
  useGetSinglePerformerByIdQuery,
  useGetPerformerReviewsQuery,
  useGetAllReviewsQuery,
  useAddPerformerReviewMutation
} = performersApi;
