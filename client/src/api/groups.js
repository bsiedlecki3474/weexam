import axios from "../axios/axios";

const addGroup = async (data) => {
  const res = await axios.post('/group/add', data);
  return res.data;
}

const saveGroup = async (id, data) => {
  console.log(id, data)
  const res = await axios.post(`/group/${id}/save`, data);
  return res.data
}

const getGroupList = async () => {
  const res = await axios.get('/group/list');
  return res.data
}

const getSingleGroup = async (id) => {
  const res = await axios.get(`/group/${id}`);
  return res.data
}

const getAssignedUsers = async (id) => {
  const res = await axios.get(`/group/${id}/users`);
  return res.data
}

const addUserToGroup = async (userId, groupId) => {
  const res = await axios.post('/group/addUserToGroup', { userId, groupId });
  return res.data;
}

const removeUserFromGroup = async (userId, groupId) => {
  const res = await axios.post('/group/removeUserFromGroup', { userId, groupId });
  return res.data;
}



export {
  addGroup,
  saveGroup,
  getGroupList,
  getSingleGroup,
  getAssignedUsers,
  addUserToGroup,
  removeUserFromGroup
}