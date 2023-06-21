import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://cinesight-api.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosClient;
