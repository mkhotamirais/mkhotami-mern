import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    token: JSON.parse(localStorage.getItem("userToken")) || null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = jwtDecode(action.payload);
      const expTime = new Date().getTime() * 30 * 24 * 3600000;
      state.token = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
      localStorage.setItem("expTime", expTime);
      localStorage.setItem("userToken", JSON.stringify(state.token));
    },
    removeUserData: (state) => {
      state.userData = null;
      state.token = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("expTime");
      localStorage.removeItem("userToken");
    },
  },
});

export const { setUserData, removeUserData } = authSlice.actions;

export default authSlice.reducer;
