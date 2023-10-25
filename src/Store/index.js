/* eslint-disable no-unused-vars */
import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    login: (state, action) => {
      const User = { ...state.currentUser, ...action.payload };
      localStorage.setItem("user", JSON.stringify(User));
      state.currentUser = User;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
    updateWallet: (state, action) => {
      const updatedUser = { ...state.currentUser, wallet: action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      state.currentUser = updatedUser;
    },
  },
});
export const userActions = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
