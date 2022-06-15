import { configureStore } from "@reduxjs/toolkit";
import common from "./Reducers/common";
export default configureStore({
  reducer: { common: common },
});
