import useStore from '../../../src/hooks/useStore';
import { setGlobalLoading, resetGlobalStore } from '../../../src/store/global';

describe('GlobalStore', () => {
  afterEach(() => {
    resetGlobalStore();
  });

  it('should set is loading', () => {
    const store = useStore();

    setGlobalLoading(true);
    expect(store.Global.isLoading).toBeTruthy();
  });

  it('should reset the store', () => {
    setGlobalLoading(true);
    resetGlobalStore();

    const store = useStore();
    expect(store.Global.isLoading).toBeFalsy();
  });
});
