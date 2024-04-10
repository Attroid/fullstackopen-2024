import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationReducer";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdoteId = action.payload;

      return state.map((anecdote) =>
        anecdote.id === anecdoteId
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    createAnecdote(state, action) {
      const content = action.payload;

      return state.concat(asObject(content));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { setAnecdotes } = anecdoteSlice.actions;

export const voteAnecdote = (anecdoteId) => {
  return (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(({ id }) => id === anecdoteId);
    dispatch(showNotification(`you voted '${anecdote.content}'`));
    dispatch(anecdoteSlice.actions.voteAnecdote(anecdoteId));
  };
};

export const createAnecdote = (content) => {
  return (dispatch) => {
    dispatch(anecdoteSlice.actions.createAnecdote(content));
    dispatch(showNotification(`added anecdote '${content}'`));
  };
};

export default anecdoteSlice.reducer;
