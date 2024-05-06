import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// kalau menggunakan cookie, file ini tidak digunakan

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    token: JSON.parse(localStorage.getItem("userToken")) || null,
    // userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
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
    // dari huxnwebdev
    // setCredentials(state,action){
    //   state.userInfo = action.payload;
    //   localStorage.setItem('userInfo', JSON.stringify(action.payload))
    //   const expirationTime = new Date().getTime() * 30 * 24 * 60 * 60 * 1000;
    //   localStorage.setItem('expirationTime', expirationTime)
    // },
    // logout(state){
    //   state.userInfo = null;
    //   localStorage.clear();
    // }
  },
});

export const { setUserData, removeUserData } = authSlice.actions;

export default authSlice.reducer;
