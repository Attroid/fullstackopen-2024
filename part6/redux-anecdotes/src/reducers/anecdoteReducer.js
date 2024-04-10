import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationReducer";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
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
  },
});

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
