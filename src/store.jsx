import { configureStore } from "@reduxjs/toolkit";
import { venuesApi } from "./apis/venues";
import { performersApi } from "./apis/performers";

export const store = configureStore({
  reducer: {
    [venuesApi.reducerPath]: venuesApi.reducer,
    [performersApi.reducerPath]: performersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(venuesApi.middleware)
      .concat(performersApi.middleware),
});
