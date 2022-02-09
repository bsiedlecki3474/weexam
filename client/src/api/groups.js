import axios from "../axios/axios";

const getGroupList = async () => {
  const res = await axios.get('/group/list');
  return res.data
}

const addGroup = async (data) => {
  const res = await axios.post('/group/add', data);
  return res.data;
}

export {
  getGroupList,
  addGroup
}