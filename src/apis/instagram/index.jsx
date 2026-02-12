import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instagramApi = createApi({
  reducerPath: "instagramApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getInstagramPosts: builder.query({
      query: () => `/api/user/instagram/posts`,
      // No polling - rely on backend cache freshness
      // Backend uses Redis cache with 6-12 hour TTL
      // Cron job updates cache automatically
    }),
  }),
});

export const { 
  useGetInstagramPostsQuery,
} = instagramApi;

