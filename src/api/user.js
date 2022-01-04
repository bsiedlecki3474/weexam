import axios from "../axios/axios";

const getUserList = async () => {
  const res = await axios.get('/user/list');
  return res.data
}

export {
  getUserList
}