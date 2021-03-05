import useStore from '../../../src/hooks/useStore';
import useIframeControl from '../../../src/hooks/useIframeControl';

describe('useIframeControl', () => {
  it('Should update the values of store in development', () => {
    const { updateCoreValuesOnStore } = useIframeControl();
    const store = useStore();

    updateCoreValuesOnStore();

    expect(store.currentPage).toBe('https://playground-url.app');
    expect(store.apiKey).toBe('dc25ac58-231c-4f4d-bda8-9311f77602bf');
    expect(store.fingerprint).toBe('1232345452');
  });

  it('Should update the values of store in production', () => {
    process.env.NODE_ENV = 'production';
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        search: 'api_key=123&page=banana&fingerprint=1234'
      }
    });

    const { updateCoreValuesOnStore } = useIframeControl();

    const store = useStore();

    updateCoreValuesOnStore();

    expect(store.currentPage).toBe('banana');
    expect(store.apiKey).toBe('123');
    expect(store.fingerprint).toBe('1234');
  });
  it('Should notify the page what the widget can be open', () => {
    const spyPostMessage = jest.spyOn(window.parent, 'postMessage');

    const { notifyOpen } = useIframeControl();

    notifyOpen();

    expect(spyPostMessage).toBeCalledWith(
      {
        isWidget: true,
        isOpen: true
      },
      '*'
    );
  });

  it('Should notify the page what the widget can be close', () => {
    const spyPostMessage = jest.spyOn(window.parent, 'postMessage');

    const { notifyClose } = useIframeControl();

    notifyClose();

    expect(spyPostMessage).toBeCalledWith(
      {
        isWidget: true,
        isOpen: false
      },
      '*'
    );
  });
});
