import { createSlice } from "@reduxjs/toolkit";

export const fTabStateSlice = createSlice({
  name: "fTabState",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = fTabStateSlice.actions;

export default fTabStateSlice.reducer;
