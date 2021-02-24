import { shallowMount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import HeaderLogged from '../../../src/components/HeaderLogged/index.vue';
import { routes } from '../../../src/router';

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

const mockStore = { currentUser: {} };
jest.mock('../../../src/hooks/useStore', () => () => mockStore);

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render 3 dots when there\'s not user logged', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const btnLogout = wrapper.find('#logout-button');
    expect(btnLogout.text()).toBe('...');
  });

  it('should render user name when there\'s not user logged', async () => {
    router.push('/');
    await router.isReady();
    mockStore.currentUser.name = 'Banana';

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const btnLogout = wrapper.find('#logout-button');
    expect(btnLogout.text()).toBe('Banana (sair)');
  });

  it('should log out of account', async () => {
    localStorage.setItem('token', '123');

    router.push('/');
    await router.isReady();
    mockStore.currentUser.name = 'Banana';

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const btnLogout = wrapper.find('#logout-button');
    expect(btnLogout.text()).toBe('Banana (sair)');

    await btnLogout.trigger('click');
    mockStore.currentUser = {};

    await flushPromises();

    expect(localStorage.getItem('token')).toBe(null);
    expect(router.currentRoute.value.name).toBe('Home');
  });

  it('should change of route', async () => {
    router.push('/');
    await router.isReady();
    mockStore.currentUser.name = 'Banana';

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const btnCredencials = wrapper.find('#router-credencials');
    expect(btnCredencials.text()).toBe('Credencias');

    await btnCredencials.trigger('click');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe('Credencials');
  });
});
