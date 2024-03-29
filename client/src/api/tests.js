import axios from "../axios/axios";

const addTest = async (data) => {
  const res = await axios.post('/test/add', data);
  return res.data;
}

const saveTest = async (id, data) => {
  const res = await axios.post(`/test/${id}/save`, data);
  return res.data
}

const deleteTest = async (id) => {
  const res = await axios.delete(`/test/${id}/delete`);
  return res.data
}

const getTestList = async () => {
  const res = await axios.get('/test/list');
  return res.data;
}

const getSingleTest = async (id) => {
  const res = await axios.get(`/test/${id}`);
  return res.data
}

const getEvents = async (id) => {
  const res = await axios.get(`/test/${id}/events`);
  return res.data
}

const getQuestions = async (id) => {
  const res = await axios.get(`/test/${id}/questions`);
  return res.data
}


export {
  addTest,
  saveTest,
  deleteTest,
  getTestList,
  getSingleTest,
  getEvents,
  getQuestions
}