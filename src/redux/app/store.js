import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import { sCartSlice } from "../features/sCart/sCartSlice"; // Import sCartSlice correctly

import sCartDetailsReducer from "../features/sCart/sCartDetails";
import userCoursesReducer from "../features/users/userCoursesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [sCartSlice.reducerPath]: sCartSlice.reducer, // Add sCartSlice reducer to the reducer object
    sCartDetails: sCartDetailsReducer,
    userCourses: userCoursesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});
setupListeners(store.dispatch);
