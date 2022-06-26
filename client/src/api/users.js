import axios from "../axios/axios";

const addUser = async (data) => {
  const res = await axios.post('/user/add', data);
  return res.data;
}

const saveUser = async (id, data) => {
  const res = await axios.post(`/user/${id}/save`, data);
  return res.data
}

const deleteUser = async (id) => {
  const res = await axios.delete(`/user/${id}/delete`);
  return res.data
}

const getSingleUser = async (id) => {
  const res = await axios.get(`/user/${id}`);
  return res.data
}

const getUserAssessmentReport = async (eventId, userId) => {
  const res = await axios.get(`/user/${userId}/assessmentReport/${eventId}`);
  return res.data;
}

const getUserList = async () => {
  const res = await axios.get('/user/list');
  return res.data;
}

const getUserTestEvents = async () => {
  const res = await axios.get(`/user/testEvents`);
  return res.data;
}

export {
  addUser,
  saveUser,
  deleteUser,
  getSingleUser,
  getUserList,
  getUserTestEvents,
  getUserAssessmentReport
}