import axios from "../axios/axios";

const addEvent = async (testId, data) => {
  const res = await axios.post('/event/add', { testId, ...data });
  return res.data;
}

const saveEvent = async (id, data) => {
  const res = await axios.post(`/event/${id}/save`, data);
  return res.data
}

const deleteEvent = async (id) => {
  const res = await axios.get(`/event/${id}/events`);
  return res.data
}

const getSingleEvent = async (id) => {
  const res = await axios.get(`/event/${id}`);
  return res.data
}

const getAssignedGroups = async (id) => {
  const res = await axios.get(`/event/${id}/groups`);
  return res.data
}

const addGroup = async (id, groupId) => {
  const res = await axios.post(`/event/${id}/addGroup`, { groupId });
  return res.data;
}

const removeGroup = async (id, groupId) => {
  const res = await axios.post(`/event/${id}/removeGroup`, { groupId });
  return res.data;
}

export {
  addEvent,
  saveEvent,
  deleteEvent,
  getSingleEvent,
  getAssignedGroups,
  addGroup,
  removeGroup
}