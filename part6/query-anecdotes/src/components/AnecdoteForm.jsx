import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";
import { useState } from "react";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

      const timeoutId = setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `added anecdote '${createdAnecdote.content}'`,
          timeoutId,
        },
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
