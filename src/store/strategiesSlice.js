import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadStrategies = createAsyncThunk(
  "/modules/strategic-analysis/strategies",
  async (params) => {
    return await axios
      .get("/modules/strategic-analysis/strategies", {
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

export const strategiesSlice = createSlice({
  name: "strategies",
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
    builder.addCase(loadStrategies.fulfilled, (state, action) => {
      const strategies = action.payload;
      state.list = {
        ...state.list,
        data: strategies.data,
        pagination: {
          current: strategies.meta.current_page,
          total: strategies.meta.total,
          pageSize: strategies.meta.per_page
        }
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setList } = strategiesSlice.actions

export default strategiesSlice.reducer;
