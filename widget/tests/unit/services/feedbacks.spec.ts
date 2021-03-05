import axios from 'axios';
import FeedbacksService from '../../../src/services/feedbacks';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FeedbacksService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create a new feedback', async () => {
    const feedbackData = {
      type: 'POSITIVE',
      text: 'Testing...',
      fingerprint: '123',
      device: 'Android',
      page: 'http://banana.banana',
      apiKey: '123-asd'
    };

    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: feedbackData })
    );

    const response = await FeedbacksService(mockedAxios).create(feedbackData);

    expect(response.data).toMatchObject(feedbackData);
    expect(response.errors).toBeNull();
  });

  it('should not create a new feedback and return a error', async () => {
    const feedbackData = {
      type: 'POSITIVE',
      text: 'Testing...',
      fingerprint: '123',
      device: 'Android',
      page: 'http://banana.banana',
      apiKey: '123-asd'
    };

    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
        request: { status: 500, statusText: 'Error internal' }
      })
    );

    const response = await FeedbacksService(mockedAxios).create(feedbackData);

    expect(response.data).toMatchObject({});
    expect(response.errors).toBeNull();
  });
});
