// src/redux/features/sCart/sCartDetails.js
import { createSlice } from "@reduxjs/toolkit";

const sCartDetailsSlice = createSlice({
  name: "sCartDetails",
  initialState: {
    length: 0,
  },
  reducers: {
    setCartLength(state, action) {
      state.length = action.payload;
    },
  },
});

export const { setCartLength } = sCartDetailsSlice.actions;

export default sCartDetailsSlice.reducer;
