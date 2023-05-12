import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../feature/auth/authSlice";
import transectionSlice from "../feature/transection/transectionSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    transection: transectionSlice,
  },
});

export default store;
