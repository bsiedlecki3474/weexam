import axios from "../axios/axios";

const getGroupList = async () => {
  const res = await axios.get('/group/list');
  return res.data
}

export {
  getGroupList
}