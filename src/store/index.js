import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";
import productGroupsSlice from "./productGroupsSlice";
import interestedPartiesAnalysisExpectationsSlice from "./interestedPartiesAnalysisExpectationsSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    productGroups: productGroupsSlice,
    interestedPartiesAnalysisExpectations: interestedPartiesAnalysisExpectationsSlice
  },
});

export default store;