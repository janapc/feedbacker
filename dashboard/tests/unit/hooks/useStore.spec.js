import UseStore from '../../../src/hooks/useStore';

describe('UseStore Hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should get all stores', () => {
    const useStore = UseStore();

    expect(useStore).toEqual({ Global: { isLoading: false }, User: { currentUser: {} } });
  });

  it('should get parameter user and return the store of user', () => {
    const useStore = UseStore('User');

    expect(useStore).toEqual({ currentUser: {} });
  });

  it('should get parameter global and return the store of global', () => {
    const useStore = UseStore('Global');

    expect(useStore).toEqual({ isLoading: false });
  });
});
