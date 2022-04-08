import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import productGroupsSlice from "./productGroupsSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    productGroups: productGroupsSlice
  },
});

export default store;