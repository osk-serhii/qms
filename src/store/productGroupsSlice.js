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
      pageSize: 5,
      total: 0,
    },
    data: [],
    searchVal: ""
  },
};

export const productGroupsSlice = createSlice({
  name: "productGroups",
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
    builder.addCase(loadProductGroups.fulfilled, (state, action) => {
      const productGroups = action.payload;
      state.list = {
        ...state.list,
        data: productGroups.data,
        pagination: {
          current: productGroups.meta.current_page,
          total: productGroups.meta.total,
          pageSize: productGroups.meta.per_page
        }
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setList } = productGroupsSlice.actions

export default productGroupsSlice.reducer;
