import { configureStore } from "@reduxjs/toolkit";
import { venuesApi } from "./apis/venues";

export const store = configureStore({
  reducer: {
    [venuesApi.reducerPath]: venuesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(venuesApi.middleware),
});
