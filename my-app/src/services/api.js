import axios from "axios";

const BASE_URL = "http://localhost:5000/api/sensor/latest";

export const getLatest = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
