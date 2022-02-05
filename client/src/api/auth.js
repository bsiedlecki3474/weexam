import axios from "../axios/axios";

const signIn = async (username, password) => {
  const res = await axios.post('/auth/signIn', { username, password });
  return res.data
}

const signOut = async () => {
  const res = await axios.post('/auth/signOut');
  return res.data
}

const verifyUser = async () => {
  const res = await axios.get('/auth/verifyUser')
  return res.data
}

export {
  signIn,
  signOut,
  verifyUser
}