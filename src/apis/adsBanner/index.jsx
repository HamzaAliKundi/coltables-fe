import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsBannerApi = createApi({
  reducerPath: "adsBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: (type) => `/api/user/banner/get-all-banners?type=${type}`,
    }),

    getAllAds: builder.query({
      query: (type) => `/api/user/advertisement/get-all-advertisements?type=${type}`,
    }),
  }),
});

export const { useGetAllAdsQuery, useGetAllBannersQuery } = adsBannerApi;
