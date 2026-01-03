import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (data) => ({
        url: "/api/user/booking/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "/api/user/booking/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyCaptcha: builder.mutation({
      query: (data) => ({
        url: "/api/user/booking/verify-captcha",
        method: "POST",
        body: data,
      }),
    }),
    submitBookingRequest: builder.mutation({
      query: (data) => ({
        url: "/api/user/booking/submit",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useVerifyCaptchaMutation,
  useSubmitBookingRequestMutation,
} = bookingApi;
