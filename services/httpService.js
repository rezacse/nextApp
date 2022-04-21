//https://nextjs-course-c81cc-default-rtdb.firebaseio.com/events.json

import axios from 'axios';
// import { getTimezoneOffset } from '../helpers/commonHelper';
// import { getToken, removeLoginUser } from '../helpers/storageHelper';
import loggerService from './loggerService';

function handleError(error) {
  const { response: res } = error;
  if (!res) return error;
  if (res.status === 401) {
    removeLoginUser();
    return { message: 'Please login again.' };
  }
  if (res.status === 403) {
    return { message: 'You not permitted to perform this action.' };
  }
  // const isUnexpectedError = res.status >= 400 && res.status < 600;
  loggerService.log('UNEXPECTED ERROR');
  return { message: 'An unexpected error occurred.' };
}

const appHttp = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-version': '1.1'
    //timeDifference: getTimezoneOffset()
  }
});

// if(token) axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
appHttp.interceptors.request.use((config) => {
  //   const token = getToken();
  //   // eslint-disable-next-line no-param-reassign
  //   if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// axiosClient.defaults.headers['Content-type'] = 'application/json;';

appHttp.interceptors.response.use(
  (success) => Promise.resolve(success.data),
  (error) => Promise.resolve(handleError(error))
);

export default {
  get: appHttp.get,
  post: appHttp.post,
  put: appHttp.put,
  delete: appHttp.delete
};
