import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_API_KEY;

const getByQuery = (query) => {
  const request = axios.get(`${baseUrl}?q=${query}&appid=${apiKey}`);
  return request.then((response) => response.data);
};

export default { getByQuery };
