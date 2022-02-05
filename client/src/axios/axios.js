import axios from 'axios';

const headers = {
  "Content-type": "application/json"
}

export default axios.create({
  baseURL: "http://localhost:3456",
  withCredentials: true,
  headers
});