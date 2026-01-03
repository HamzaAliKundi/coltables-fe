import { configureStore } from "@reduxjs/toolkit";
import { venuesApi } from "./apis/venues";
import { performersApi } from "./apis/performers";
import { eventsApi } from "./apis/events";
import { adsBannerApi } from "./apis/adsBanner";
import { bookingApi } from "./apis/booking";
import { instagramApi } from "./apis/instagram";

export const store = configureStore({
  reducer: {
    [venuesApi.reducerPath]: venuesApi.reducer,
    [performersApi.reducerPath]: performersApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [adsBannerApi.reducerPath]: adsBannerApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [instagramApi.reducerPath]: instagramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(venuesApi.middleware)
      .concat(performersApi.middleware)
      .concat(eventsApi.middleware)
      .concat(adsBannerApi.middleware)
      .concat(bookingApi.middleware)
      .concat(instagramApi.middleware),
});
