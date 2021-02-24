import axios from 'axios';

import router from '../router';
import AuthService from './auth';
import UsersService from './users';
import FeedbacksService from './feedbacks';

import { setGlobalLoading } from '../store/global';

const API_ENVS = {
  production: 'https://backend-vue3js-ixvpypm03.vercel.app/',
  development: 'http://localhost:3000',
  local: 'http://localhost:3000',
};

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local,
});

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    return response;
  },
  (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }
    if (error.response.status === 401) {
      router.push({ name: 'Home' });
    }
    setGlobalLoading(false);
    return error;
  },
);

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem('token');

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient),
};
