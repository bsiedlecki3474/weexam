import axios from "../axios/axios";

const getTestList = async () => {
  const res = await axios.get('/test/list');
  return res.data;
}

const addTest = async (data) => {
  const res = await axios.post('/test/add', data);
  return res.data;
}

export {
  getTestList,
  addTest
}