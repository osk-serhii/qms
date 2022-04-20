import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadContextAnalysises = createAsyncThunk(
  "/modules/strategic-analysis/context-analysises",
  async (params) => {
    return await axios
      .get("/modules/strategic-analysis/context-analysises", {
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

export const contextAnaysisesSlice = createSlice({
  name: "contextAnalysises",
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
    builder.addCase(loadContextAnalysises.fulfilled, (state, action) => {
      const contextAnalysises = action.payload;
      state.list = {
        ...state.list,
        data: contextAnalysises.data,
        pagination: {
          current: contextAnalysises.meta.current_page,
          total: contextAnalysises.meta.total,
          pageSize: contextAnalysises.meta.per_page
        }
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setList } = contextAnaysisesSlice.actions

export default contextAnaysisesSlice.reducer;
