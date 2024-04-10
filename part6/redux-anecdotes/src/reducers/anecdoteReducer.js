import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationReducer";
import anecdoteService from "../services/anecdotes";

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
    appendAnecdote(state, action) {
      state.push(action.payload);
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
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.create({ content, votes: 0 });
    dispatch(anecdoteSlice.actions.appendAnecdote(createdAnecdote));
    dispatch(showNotification(`added anecdote '${createdAnecdote.content}'`));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
