import axios from "../axios/axios";

const signIn = async (username, password) => {
  const res = await axios.post('/auth/signIn', { username, password });
  return res.data
}

export {
  signIn
}