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
      query: ({ page, limit, search, address, pronoun }) => {
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('page', page);
        // params.append('sort', -1);
        if (search) params.append('search', search);
        if (address) params.append('address', address);
        if (pronoun) params.append('pronoun', pronoun);
        return `/api/user/performer/get-all-performers?${params.toString()}`;
      },
    }),

    getSinglePerformerById: builder.query({
      query: (id) => `/api/user/performer/get-single-performer/${id}`,
    }),

    getPerformerReviews: builder.query({
      query: (performerId) =>
        `/api/user/review/performer/get-single-performer/${performerId}`,
    }),

    getAllReviews: builder.query({
      query: ({ page, limit, userId, userType }) =>
        `/api/user/review/get-all-reviews?limit=${limit}&page=${page}&userId=${userId}&userType=${userType}`,
    }),

    addReview: builder.mutation({
      query: ({ userId, reviewData }) => ({
        url: `api/user/review/add-review`,
        method: "POST",
        body: {
          userId,
          name: reviewData.name,
          description: reviewData.description,
          rating: reviewData.rating,
          userType: reviewData.userType,
        },
      }),
    }),

    getEventsByDate: builder.query({
      query: ({ userId, userType, month }) => 
        `/api/user/event/get-events-by-date?userId=${userId}&userType=${userType}&month=${month}`,
    }),

    getUpcomingEvents: builder.query({
      query: (userId) => 
        `/api/user/event/get-upcoming-events?userId=${userId}`,
    }),
  }),
});

export const {
  useGetAllPerformersQuery,
  useGetSinglePerformerByIdQuery,
  useGetPerformerReviewsQuery,
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useGetEventsByDateQuery,
  useGetUpcomingEventsQuery
} = performersApi;