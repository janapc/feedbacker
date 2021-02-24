export default (httpClient) => ({
  getMe: async () => {
    const response = await httpClient.get('/users/me');

    return {
      data: response.data,
    };
  },
  generateApiKey: async () => {
    const response = await httpClient.post('/users/me/apikey');

    return {
      data: response.data,
    };
  },
});
