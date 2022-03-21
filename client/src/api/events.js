import axios from "../axios/axios";

const addEvent = async (data) => {
  const res = await axios.post('/event/add', data);
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

export {
  addEvent,
  saveEvent,
  deleteEvent
}