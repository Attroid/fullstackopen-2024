import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationReducer";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? action.payload : anecdote
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
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(({ id }) => id === anecdoteId);

    const updatedAnecdote = await anecdoteService.update(anecdoteId, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch(showNotification(`you voted '${anecdote.content}'`, 5));
    dispatch(anecdoteSlice.actions.updateAnecdote(updatedAnecdote));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.create({ content, votes: 0 });
    dispatch(anecdoteSlice.actions.appendAnecdote(createdAnecdote));
    dispatch(
      showNotification(`added anecdote '${createdAnecdote.content}'`, 5)
    );
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
