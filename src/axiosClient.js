import axios from 'axios';

const url = import.meta.env.PROD ? 'https://cinesight-api-prod-5ce88a18091b.herokuapp.com'
  : 'https://cinesight-api-39a0e67bef51.herokuapp.com';

const axiosClient = axios.create({
  baseURL: url,
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosClient;
