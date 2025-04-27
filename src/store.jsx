import { configureStore } from "@reduxjs/toolkit";
import { venuesApi } from "./apis/venues";
import { performersApi } from "./apis/performers";
import { eventsApi } from "./apis/events";

export const store = configureStore({
  reducer: {
    [venuesApi.reducerPath]: venuesApi.reducer,
    [performersApi.reducerPath]: performersApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(venuesApi.middleware)
      .concat(performersApi.middleware)
      .concat(eventsApi.middleware),
});
