import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: "basic",
  initialState: {
    dark: JSON.parse(localStorage.getItem("huxnwebdevDark")) || false,
    openNav: false,
    openNavUser: false,
  },
  reducers: {
    toggleDark(state) {
      state.dark = !state.dark;
      localStorage.setItem("huxnwebdevDark", JSON.stringify(state.dark));
    },
    removeDark(state) {
      state.dark = false;
      localStorage.setItem("huxnwebdevDark", JSON.stringify(state.dark));
    },
    toggleOpenNav(state) {
      state.openNav = !state.openNav;
    },
    removeOpenNav(state) {
      state.openNav = false;
    },
    toggleOpenNavUser(state) {
      state.openNavUser = !state.openNavUser;
    },
    removeOpenNavUser(state) {
      state.openNavUser = false;
    },
  },
});

export const { toggleDark, removeDark, toggleOpenNavUser, removeOpenNavUser, toggleOpenNav, removeOpenNav } =
  basicSlice.actions;

export default basicSlice.reducer;
