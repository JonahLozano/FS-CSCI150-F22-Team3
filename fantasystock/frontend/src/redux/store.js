import { configureStore } from "@reduxjs/toolkit";
import sidebarStateReducer from "./sidebarState";
import fTabStateReducer from "./fTabState";

export default configureStore({
  reducer: { sidebarState: sidebarStateReducer, fTabState: fTabStateReducer },
});
