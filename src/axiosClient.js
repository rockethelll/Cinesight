import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://cinesight-api-39a0e67bef51.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosClient;
