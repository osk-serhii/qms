import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadProductGroups = createAsyncThunk(
  "/settings/product-groups",
  async (params) => {
    return await axios
      .get("/settings/product-groups", {
        params: params,
      })
      .then((res) => res.data);
  }
);

const initialState = {
  list: {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    data: [],
  },
};

export const productGroupsSlice = createSlice({
  name: "productGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProductGroups.fulfilled, (state, action) => {
      state.list = {
        pagination: {
          current: action.payload.meta.current_page,
          pageSize: action.payload.meta.per_page,
          total: action.payload.meta.total,
        },
        data: action.payload.data,
      };
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = productGroupsSlice.actions

export default productGroupsSlice.reducer;
