import axios from "axios";
const baseUrl = "/api/blogs";

const config = {
  headers: {
    Authorization: null,
  },
};

const setToken = (newToken) => {
  config.headers.Authorization = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blogId, blog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blog, config);
  return response.data;
};

const remove = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, create, setToken, update, remove };
