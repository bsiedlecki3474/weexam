import axios from "../axios/axios";

const getAssessment = async (id) => {
  const res = await axios.get(`/assessment/${id}`);
  return res.data
}

const getQuestions = async (id) => {
  const res = await axios.get(`/assessment/${id}/questions`);
  return res.data
}

const startAssessment = async (id) => {
  const res = await axios.post(`/assessment/${id}/start`);
  return res.data
}

const saveAnswers = async (id, answers) => {
  const res = await axios.post(`/assessment/${id}/saveAnswers`, { answers });
  return res.data
}

export {
  getAssessment,
  startAssessment,
  getQuestions,
  saveAnswers
}