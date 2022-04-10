import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curUser: null,
  searchVal: "",
  lang: "en",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    selectOwner: (state, action) => {
      state.curUser = action.payload;
    },
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
 export const { selectOwner, setSearchVal, setLang } = commonSlice.actions

export default commonSlice.reducer;
