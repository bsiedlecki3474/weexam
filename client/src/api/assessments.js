import axios from "../axios/axios";

const getAssessment = async (id) => {
  const res = await axios.get(`/assessment/${id}`);
  return res.data
}

const startAssessment = async (id) => {
  const res = await axios.post(`/assessment/${id}/start`);
  return res.data
}

export {
  getAssessment,
  startAssessment
}