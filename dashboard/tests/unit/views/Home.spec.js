import { createRouter, createWebHistory } from 'vue-router';
import { shallowMount, flushPromises } from '@vue/test-utils';

import Home from '../../../src/views/Home/index.vue';
import { routes } from '../../../src/router';

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
global.localStorage = localStorageMock;

describe('<Home />', () => {
  it('should render home correctly', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should go to page feedback if the user has a token', async () => {
    localStorage.setItem('token', '123');
    router.push('/');

    await router.isReady();
    shallowMount(Home, {
      global: {
        plugins: [router]
      }
    });

    expect(localStorage.getItem('token')).toBe('123');
    await flushPromises();

    expect(router.currentRoute.value.name).toBe('Feedbacks');

    localStorage.clear();
  });
});
