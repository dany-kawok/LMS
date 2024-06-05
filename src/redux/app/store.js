// store.js

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import { locationAndTimingApi } from "../features/location/locationSlice";
import shoppingCartApi from "../features/sCart/sCartSlice";
import sCartDetailsReducer from "../features/sCart/sCartDetails";
import userCoursesReducer from "../features/users/userCoursesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    locationAndTiming: locationAndTimingApi.reducer,
    [locationAndTimingApi.reducerPath]: locationAndTimingApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    sCartDetails: sCartDetailsReducer,
    userCourses: userCoursesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiSlice.middleware,
      locationAndTimingApi.middleware
    );
  },
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});
setupListeners(store.dispatch);
