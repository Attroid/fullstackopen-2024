import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "This is initial notification from redux state",
});

export default notificationSlice.reducer;
