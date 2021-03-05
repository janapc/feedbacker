import axios from 'axios';

import FeedbacksService from './feedbacks';

type ApiEnvProps = {
  production: string;
  development: string;
  local: string;
};

const API_ENVS: ApiEnvProps = {
  production: 'https://backend-vue3js.vercel.app',
  development: 'http://localhost:3000',
  local: 'http://localhost:3000'
};

const nodeEnv = process.env.NODE_ENV;

const httpClient = axios.create({
  baseURL: API_ENVS[nodeEnv] || API_ENVS.local
});

httpClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      throw new Error(error.message);
    }
    return error;
  }
);

export default { feedbacks: FeedbacksService(httpClient) };
