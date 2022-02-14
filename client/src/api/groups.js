import axios from "../axios/axios";

const getGroupList = async () => {
  const res = await axios.get('/group/list');
  return res.data
}

const getSingleGroup = async (id) => {
  const res = await axios.get(`/group/${id}`);
  return res.data
}

const getUsersInGroup = async (id) => {
  const res = await axios.get(`/group/${id}/usersInGroup`);
  return res.data
}

const getUsersNotInGroup = async (id) => {
  const res = await axios.get(`/group/${id}/usersNotInGroup`);
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

const addGroup = async (data) => {
  const res = await axios.post('/group/add', data);
  return res.data;
}

export {
  getGroupList,
  getSingleGroup,
  getUsersInGroup,
  getUsersNotInGroup,
  addUserToGroup,
  removeUserFromGroup,
  addGroup
}