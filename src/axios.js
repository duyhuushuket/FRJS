import axios from 'axios';
import _ from 'lodash';
import config from './config';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};

export const isSuccessStatusCode = (s) => {
    // May be string or number
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ""));
        }
        if (data.hasOwnProperty('resultCode') && data.hasOwnProperty('message')) {
            if(data['resultCode']!='0000'){
              return Promise.reject(createError(response.status, data['resultCode'], data['message'], data['problems']));
            }
        }

        // Return direct data to callback
        if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
            return data['d'];
        }
        // Handle special case
        if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
            return null;
        }
        return response.data;
    },
    (error) => {
        const { response } = error;
        if (response == null) {
            return Promise.reject(error);
        }
        console.log(response);
        const { data } = response;
        console.log(data);
        if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg']));
        }

        if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
            return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        }
        if (data.hasOwnProperty('resultCode') && data.hasOwnProperty('message')) {
            console.log('go here');
            return Promise.reject(createError(response.status, data['resultCode'], data['message'], data['problems']));
        }

        return Promise.reject(createError(response.status));
    }
);

export default instance;
