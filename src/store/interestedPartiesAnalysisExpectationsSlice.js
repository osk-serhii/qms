import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadInterestedPartiesAnalysisExpectations = createAsyncThunk(
  "/modules/strategic-analysis/interested-parties",
  async (params) => {
    return await axios
      .get("/modules/strategic-analysis/interested-parties", {
        params: params,
      })
      .then((res) => res.data);
  }
);

const initialState = {
  list: {
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
    data: [],
    searchVal: ""
  },
};

export const interestedPartiesAnalysisExpectationsSlice = createSlice({
  name: "interestedPartiesAnalysisExpectations",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = {
        ...state.list,
        ...action.payload
      };
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loadInterestedPartiesAnalysisExpectations.fulfilled, (state, action) => {
      const interestedPartiesAnalysisExpectations = action.payload;
      state.list = {
        ...state.list,
        data: interestedPartiesAnalysisExpectations.data,
        pagination: {
          current: interestedPartiesAnalysisExpectations.meta.current_page,
          total: interestedPartiesAnalysisExpectations.meta.total,
          pageSize: interestedPartiesAnalysisExpectations.meta.per_page
        }
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setList } = interestedPartiesAnalysisExpectationsSlice.actions

export default interestedPartiesAnalysisExpectationsSlice.reducer;
