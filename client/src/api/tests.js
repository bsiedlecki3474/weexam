import axios from "../axios/axios";

const getTestList = async () => {
  const res = await axios.get('/test/list');
  return res.data;
}

const addTest = async (data) => {
  const res = await axios.post('/test/add', data);
  return res.data;
}

const getSingleTest = async (id) => {
  const res = await axios.get(`/test/${id}`);
  return res.data
}

const getAssignedGroups = async (id) => {
  const res = await axios.get(`/test/${id}/groups`);
  return res.data
}

export {
  getTestList,
  addTest,
  getSingleTest,
  getAssignedGroups
}