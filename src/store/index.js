import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
  },
});

export default store;