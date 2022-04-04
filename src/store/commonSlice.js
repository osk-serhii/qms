import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {  } = commonSlice.actions

export default commonSlice.reducer;
