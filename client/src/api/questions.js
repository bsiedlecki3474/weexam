import axios from "../axios/axios";

const getAnswerTypes = async (data) => {
  const res = await axios.get('/question/answerTypes');
  return res.data;
}

const saveQuestions = async (id, questions) => {
  const res = await axios.post(`/question/${id}/saveQuestions`, { questions });
  return res.data
}

export {
  getAnswerTypes,
  saveQuestions
}