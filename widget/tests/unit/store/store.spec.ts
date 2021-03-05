import useStore from '../../../src/hooks/useStore';

import {
  setCurrentComponent,
  setMessage,
  setFeedbackType,
  setCurrentPage,
  setApiKey,
  setFingerprint,
  resetStore
} from '../../../src/store';

describe('Store', () => {
  it('should set current component', () => {
    const store = useStore();

    setCurrentComponent('Modal');
    expect(store.currentComponent).toBe('Modal');
  });

  it('should set message', () => {
    const store = useStore();

    setMessage('testing...');
    expect(store.message).toBe('testing...');
  });

  it('should set feedback type', () => {
    const store = useStore();

    setFeedbackType('positive');
    expect(store.feedbackType).toBe('positive');
  });

  it('should set current page', () => {
    const store = useStore();

    setCurrentPage('Home');
    expect(store.currentPage).toBe('Home');
  });

  it('should set api key', () => {
    const store = useStore();

    setApiKey('f7jsl-92sl-p090');
    expect(store.apiKey).toBe('f7jsl-92sl-p090');
  });

  it('should set fingerprint', () => {
    const store = useStore();

    setFingerprint('test');
    expect(store.fingerprint).toBe('test');
  });

  it('should reset store', () => {
    const initialStore = {
      currentComponent: 'SelectFeedbackType',
      message: '',
      feedbackType: '',
      fingerprint: '',
      apiKey: '',
      currentPage: ''
    };

    const storeCurrent = {
      currentComponent: 'Modal',
      message: 'testing...',
      feedbackType: 'positive',
      fingerprint: 'test',
      apiKey: 'f7jsl-92sl-p090',
      currentPage: 'Home'
    }

    const store = useStore();
    expect(store).toEqual(storeCurrent);

    resetStore();
    expect(store).toEqual(initialStore);
  });
});
