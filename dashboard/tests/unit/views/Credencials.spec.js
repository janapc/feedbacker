import { shallowMount, flushPromises } from '@vue/test-utils';
import vueToastification, { useToast } from 'vue-toastification';

import services from '../../../src/services';
import Credencials from '../../../src/views/Credencials/index.vue';
import { setApiKey } from '../../../src/store/user';

const mockStore = {
  User: { currentUser: { name: 'Banana', apiKey: '123banana' } },
  Global: { isLoading: false }
};
jest.mock('../../../src/hooks/useStore', () => () => mockStore);

jest.mock('vue-toastification');

const toast = {
  clear: jest.fn(),
  success: jest.fn()
};

jest.mock('../../../src/services');
jest.mock('../../../src/store/user');

const mockClipboard = {
  writeText: jest.fn()
};

global.navigator.clipboard = mockClipboard;

describe('<Credencials />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  it('should render Credencials correctly', () => {
    const wrapper = shallowMount(Credencials, {
      global: {
        plugins: [vueToastification]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render the content loader if the variable isLoading be true', () => {
    mockStore.Global = { isLoading: true };

    const wrapper = shallowMount(Credencials, {
      global: {
        plugins: [vueToastification]
      }
    });

    expect(wrapper.findComponent('#headerLogged').exists()).toBe(true);
    expect(wrapper.findComponent('#contentLoader').exists()).toBe(true);

    expect(wrapper.find('#contentApikey').exists()).toBe(false);
    expect(wrapper.find('#contentScript').exists()).toBe(false);
  });

  it('should show the API key of the user and generate a script for the user', () => {
    mockStore.Global = { isLoading: false };

    const sriptText = '<script src="http://janapc-feeadbacker-widget.netlify.app?api_key=123banana"></script>';

    const wrapper = shallowMount(Credencials, {
      global: {
        plugins: [vueToastification]
      }
    });

    expect(wrapper.find('#apikey').text()).toBe('123banana');
    expect(wrapper.find('#apikey-copy').attributes('color')).toContain('#C0BCB0');
    expect(wrapper.find('#generate-apikey').attributes('color')).toContain('#C0BCB0');
    expect(wrapper.find('pre').text()).toBe(sriptText);
  });

  it('should copy the api key of user', async () => {
    useToast.mockReturnValueOnce(toast);
    const wrapper = shallowMount(Credencials);

    expect(wrapper.find('#apikey').text()).toBe('123banana');
    expect(wrapper.find('#apikey-copy').exists()).toBeTruthy();

    await wrapper.find('#apikey-copy').trigger('click');

    await flushPromises();

    expect(toast.clear).toBeCalled();
    expect(toast.success).toBeCalledWith('Copiado!');
  });

  it('should return a message of the error to the user', async () => {
    services.users.generateApiKey.mockReturnValueOnce({ error: { status: 500 } });

    const wrapper = shallowMount(Credencials, {
      global: {
        plugins: [vueToastification]
      }
    });

    expect(wrapper.find('#apikey').text()).toBe('123banana');
    expect(wrapper.find('#generate-apikey').exists()).toBeTruthy();

    await wrapper.find('#generate-apikey').trigger('click');

    await flushPromises();

    expect(wrapper.find('#error-apiKey').exists()).toBe(true);
    expect(wrapper.find('#error-apiKey').text()).toBe('Erro ao carregar a apiKey');
    expect(wrapper.find('#apikey').exists()).toBe(false);

    expect(wrapper.find('#error-script').exists()).toBe(true);
    expect(wrapper.find('#error-script').text()).toBe('Erro ao carregar o script');
    expect(wrapper.find('pre').exists()).toBe(false);
  });

  it('should generate new api key to user', async () => {
    const newApiKey = 'new123banana123';

    services.users.generateApiKey.mockReturnValueOnce({ data: { apiKey: newApiKey } });
    setApiKey.mockImplementationOnce((apiKey) => {
      mockStore.User.currentUser.apiKey = apiKey;
    });

    const wrapper = shallowMount(Credencials, {
      global: {
        plugins: [vueToastification]
      }
    });

    expect(wrapper.find('#apikey').text()).toBe('123banana');
    expect(wrapper.find('#generate-apikey').exists()).toBeTruthy();

    await wrapper.find('#generate-apikey').trigger('click');
    expect(setApiKey).toBeCalledWith(newApiKey);

    await flushPromises();

    expect(mockStore.User.currentUser.apiKey).toBe(newApiKey);
    expect(wrapper.find('#apikey').text()).toBe(newApiKey);
  });
});
