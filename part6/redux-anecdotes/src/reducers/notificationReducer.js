import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const { message, timeoutId } = action.payload;

      if (state) {
        clearTimeout(state.timeoutId);
      }

      return { message, timeoutId };
    },
    clearNotification(state, action) {
      if (state) {
        clearTimeout(state.timeoutId);
      }

      return null;
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, timeoutDurationInSeconds) => {
  return (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timeoutDurationInSeconds * 1000);

    dispatch(
      setNotification({
        message,
        timeoutId,
      })
    );
  };
};

export default notificationSlice.reducer;
