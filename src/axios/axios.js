import axios from 'axios';

const headers = {
  "Content-type": "application/json"
}

if (localStorage.getItem('token')) {
  headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default axios.create({
  baseURL: "http://localhost:3456",
  headers
});