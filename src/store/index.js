import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";
import productGroupsSlice from "./productGroupsSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    productGroups: productGroupsSlice
  },
});

export default store;