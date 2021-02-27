import mockAxios from 'axios';
import FeedbacksService from '../../../src/services/feedbacks';

jest.mock('axios');

describe('FeedbacksService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return all feedbacks', async () => {
    const results = [{ text: 'Test test', type: 'ISSUE' }];

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { results } }));

    const response = await FeedbacksService(mockAxios).getAll();

    expect(response.data).toMatchObject({ results });
  });

  it('should return summary', async () => {
    const data = {
      all: 7,
      issue: 3,
      idea: 3,
      other: 1
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await FeedbacksService(mockAxios).getSummary();

    expect(response.data).toMatchObject(data);
  });
});
