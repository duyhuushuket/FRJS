import axios from '../axios';
//import * as queryString from 'query-string';

const userService = {

  login(loginBody) {
    return axios.post(`/api/login`, loginBody)
  },
};

export default userService;