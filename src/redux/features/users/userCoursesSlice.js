// src/redux/features/users/userCoursesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userCoursesSlice = createSlice({
  name: "userCourses",
  initialState: {
    courses: [],
  },
  reducers: {
    setUserCourses(state, action) {
      state.courses = action.payload;
    },
  },
});

export const { setUserCourses } = userCoursesSlice.actions;

export default userCoursesSlice.reducer;
