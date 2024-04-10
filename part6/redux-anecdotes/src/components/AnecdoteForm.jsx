import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmitAnecdote = (ev) => {
    ev.preventDefault();
    const content = ev.target.content.value;
    ev.target.content.value = "";
    dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={handleSubmitAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="content" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
