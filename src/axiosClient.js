import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:4000',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosClient;
