import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const update = async (anecdoteId, anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdoteId}`, anecdote);
  return response.data;
};

export default { getAll, create, update };
