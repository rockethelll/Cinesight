import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://cinesight-api-prod-5ce88a18091b.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosClient;
