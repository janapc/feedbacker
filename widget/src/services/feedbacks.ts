import { AxiosInstance } from 'axios';
import { Feedback } from '../types/Feedback';
import { RequestError } from '../types/error';

export type Create = {
  data: Feedback | null;
  errors: RequestError | null;
};

type CreatePayload = {
  type: string;
  text: string;
  fingerprint: string;
  device: string;
  page: string;
  apiKey: string;
};

export interface Feedbacks {
  create(payload: CreatePayload): Promise<Create>;
}

function Feedbacks (httpClient: AxiosInstance): Feedbacks {
  async function create (payload: CreatePayload): Promise<Create> {
    const response = await httpClient.post<Feedback>('/feedbacks', payload);
    let errors: RequestError | null = null;

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      };
    }

    return {
      data: response.data,
      errors
    };
  }

  return { create };
}

export default Feedbacks;
