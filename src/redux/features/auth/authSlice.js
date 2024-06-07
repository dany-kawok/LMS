// src/redux/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!Cookies.get("accessToken"),
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove("accessToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
