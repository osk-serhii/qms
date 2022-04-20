import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";
import productGroupsSlice from "./productGroupsSlice";
import interestedPartiesAnalysisExpectationsSlice from "./interestedPartiesAnalysisExpectationsSlice";
import contextAnalysisesSlice from "./contextAnalysisesSlice";
import strategiesSlice from "./strategiesSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    productGroups: productGroupsSlice,
    interestedPartiesAnalysisExpectations: interestedPartiesAnalysisExpectationsSlice,
    contextAnalysises: contextAnalysisesSlice,
    strategies: strategiesSlice,
  },
});

export default store;