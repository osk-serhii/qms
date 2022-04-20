import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";
import productGroupsSlice from "./productGroupsSlice";
import interestedPartiesAnalysisExpectationsSlice from "./interestedPartiesAnalysisExpectationsSlice";
import contextAnalysisesSlice from "./contextAnalysisesSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    productGroups: productGroupsSlice,
    interestedPartiesAnalysisExpectations: interestedPartiesAnalysisExpectationsSlice,
    contextAnalysises: contextAnalysisesSlice,
  },
});

export default store;