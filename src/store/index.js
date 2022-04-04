import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
  },
});

export default store;