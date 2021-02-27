import mockAxios from 'axios';
import AuthService from '../../../src/services/auth';

jest.mock('axios');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it('should return a token when user login', async () => {
    const token = '123.123.123';
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { token } }));

    const response = await AuthService(mockAxios).login({
      email: 'banana@banana.com',
      password: '12345'
    });

    expect(response.data).toHaveProperty('token');
  });

  it('should return an user when user register', async () => {
    const user = {
      name: 'banana',
      password: '12345',
      email: 'banana@banana.com'
    };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: user }));

    const response = await AuthService(mockAxios).register(user);

    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('email');
    expect(response.data).toHaveProperty('password');
  });

  it('should throw an error when not found', async () => {
    const errors = {
      status: 404,
      statusText: 'Not Found'
    };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ request: errors }));

    const response = await AuthService(mockAxios).register({ name: '', email: '', password: '' });

    expect(response.data).toBe(undefined);
    expect(response.errors).toEqual(errors);
  });
});
