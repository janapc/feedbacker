import wait from '../../../src/utils/timeout';

describe('Timeout Utils', () => {
  it('should wait for the promise to be resolved, passing a param of time in ms', async () => {
    await expect(wait(250)).resolves.toBeUndefined();
  });

  it('should return an error if the param passed is different of a number', async () => {
    await expect(wait('250')).rejects.toThrowError('A number is requered');
  });
});
