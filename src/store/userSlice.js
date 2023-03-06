import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  userID: null,
  isAuth: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.isAuth = true;
      state.token = action.payload.accessToken;
      state.userID = action.payload.userID;
    },
    removeUser(state) {
      state.email = null;
      state.isAuth = false;
      state.token = null;
      state.userID = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
