import axios from 'axios';

export default (headers = {}) =>
  axios.create({
    baseURL: 'https://alias-cb647.firebaseio.com/',
    withCredentials: true,
    headers: {
      ...headers,
    },
  });
