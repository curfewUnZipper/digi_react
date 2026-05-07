import axios from "axios";

const API = axios.create({
  baseURL: "https://digi-flask.onrender.com",
});

export const getSummary = async () => {
  const res = await API.get("/summary");
  return res.data;
};

export const getHistory = async () => {
  const res = await API.get("/history");
  return res.data;
};

export default API;