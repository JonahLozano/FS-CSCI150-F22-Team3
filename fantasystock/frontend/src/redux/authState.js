import { createSlice } from "@reduxjs/toolkit";

export const authStateSlice = createSlice({
  name: "authState",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const { login, logout } = authStateSlice.actions;

export default authStateSlice.reducer;
