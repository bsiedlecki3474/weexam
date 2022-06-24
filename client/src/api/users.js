import axios from "../axios/axios";

const addUser = async (data) => {
  const res = await axios.post('/user/add', data);
  return res.data;
}

const saveUser = async (id, data) => {
  console.log(id, data)
  const res = await axios.post(`/user/${id}/save`, data);
  return res.data
}

const getSingleUser = async (id) => {
  const res = await axios.get(`/user/${id}`);
  return res.data
}

const getUserAssessmentReport = async (eventId, userId = null) => {
  const url = userId
    ? `/user/${userId}/assessmentReport/${eventId}`
    : `/user/assessmentReport/${eventId}`;
  const res = await axios.get(url);
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
  getSingleUser,
  getUserList,
  getUserTestEvents,
  getUserAssessmentReport
}