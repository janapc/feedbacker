import useStore from '../../../src/hooks/useStore';
import {
  setCurrentUser, resetUserStore, setApiKey, cleanCurrentUser,
} from '../../../src/store/user';

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore();
  });

  it('should set current user', () => {
    const store = useStore();

    setCurrentUser({ name: 'Banana' });
    expect(store.User.currentUser.name).toBe('Banana');
  });

  it('should set api_key on current user', () => {
    const store = useStore();

    setApiKey('123');
    expect(store.User.currentUser.apiKey).toBe('123');
  });

  it('should clean current user', () => {
    const store = useStore();

    setCurrentUser({ name: 'Banana' });
    expect(store.User.currentUser.name).toBe('Banana');

    cleanCurrentUser();
    expect(store.User.currentUser.name).toBeFalsy();
  });
});
