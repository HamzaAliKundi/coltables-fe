import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instagramApi = createApi({
  reducerPath: "instagramApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getInstagramPosts: builder.query({
      query: () => `/api/user/instagram/posts`,
      // Refetch every 5 minutes to check for new posts
      pollingInterval: 5 * 60 * 1000, // 5 minutes
    }),
  }),
});

export const { 
  useGetInstagramPostsQuery,
} = instagramApi;

