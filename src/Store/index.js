import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
    updateWallet: (state, action) => {
      state.currentUser.wallet = action.payload;
    },
  },
  extraReducers: {
    updateWallet: (state, action) => {
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const userActions = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
