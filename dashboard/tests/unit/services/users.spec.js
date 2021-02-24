import mockAxios from 'axios';
import UsersService from '../../../src/services/users';

jest.mock('axios');

describe('UsersService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return information of a user', async () => {
    const data = { name: 'Banana', email: 'banana@banana.com' };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await UsersService(mockAxios).getMe();

    expect(response.data).toMatchObject(data);
  });

  it('should return an API key of a user', async () => {
    const data = { apiKey: '123njkas' };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await UsersService(mockAxios).generateApiKey();

    expect(response.data).toMatchObject(data);
  });
});
