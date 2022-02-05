import axios from "../axios/axios";

const getUserList = async () => {
  const res = await axios.get('/user/list');
  return res.data;
}

const addUser = async (data) => {
  const res = await axios.post('/user/add', data);
  return res.data;
}

export {
  getUserList,
  addUser
}