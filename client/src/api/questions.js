import axios from "../axios/axios";

const getAnswerTypes = async (data) => {
  const res = await axios.get('/question/answerTypes');
  return res.data;
}

export {
  getAnswerTypes
}