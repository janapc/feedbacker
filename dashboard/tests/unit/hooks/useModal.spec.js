import UseModal from '../../../src/hooks/useModal';
import bus from '../../../src/utils/bus';

jest.mock('../../../src/utils/bus', () => ({
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn()
}));

describe('UseModal Hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should open modal', () => {
    const useModal = UseModal();
    const EVENT_NAME = 'modal:toggle';
    const useModalOpenSpy = jest.spyOn(useModal, 'open');

    useModal.open('login');

    expect(useModalOpenSpy).toBeCalledWith('login');
    expect(bus.emit).toBeCalledWith(EVENT_NAME, { status: true, ...'login' });
  });

  it('should close modal', () => {
    const useModal = UseModal();
    const EVENT_NAME = 'modal:toggle';
    const useModalCloseSpy = jest.spyOn(useModal, 'close');

    useModal.close('login');

    expect(useModalCloseSpy).toBeCalledWith('login');
    expect(bus.emit).toBeCalledWith(EVENT_NAME, { status: false, ...'login' });
  });

  it('should listen modal', () => {
    const useModal = UseModal();
    const EVENT_NAME = 'modal:toggle';
    const fnListen = () => 'listenModal';
    const useModalListenSpy = jest.spyOn(useModal, 'listen');

    useModal.listen(fnListen);

    expect(useModalListenSpy).toBeCalledWith(fnListen);
    expect(bus.on).toBeCalledWith(EVENT_NAME, fnListen);
  });

  it('should off modal', () => {
    const useModal = UseModal();
    const EVENT_NAME = 'modal:toggle';
    const fnOff = () => 'offModal';

    const useModalOffSpy = jest.spyOn(useModal, 'off');

    useModal.off(fnOff);

    expect(useModalOffSpy).toBeCalledWith(fnOff);
    expect(bus.off).toBeCalledWith(EVENT_NAME, fnOff);
  });
});
