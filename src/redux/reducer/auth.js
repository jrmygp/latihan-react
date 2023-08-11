import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  user_uniqueid: 0,
  user_type: "",
  full_name: "",
  email: "",
  phone_number: "",
  refferal_code: "",
  points: 0,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.user_uniqueid = action.payload.user_uniqueid;
      state.user_type = action.payload.user_type;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
      state.refferal_code = action.payload.refferal_code;
      state.points = action.payload.points;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login } = authReducer.actions;

export default authReducer.reducer;
