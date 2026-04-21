import axios from "axios";

const API_URL = "https://digi-flask.vercel.app/";

export const getRULSeries = async (data) => {
  if (data.length < 50) return null;

  const res = await axios.post(`${API_URL}/predict_series`, data);
  return res.data.rul_series;
};
