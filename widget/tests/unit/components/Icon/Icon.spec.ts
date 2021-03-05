import { mount } from '@vue/test-utils';

import Icon from '../../../../src/components/Icon/index.vue';
import Close from '../../../../src/components/Icon/Close.vue';

describe('Icon Component', () => {
  it('Should render icon with the props default', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'Close'
      }
    });

    expect(wrapper.findComponent(Close).exists()).toBeTruthy();
    expect(wrapper.findComponent(Close).props().color).toBe('white');
    expect(wrapper.findComponent(Close).props().size).toBe(22);
  });

  it('Should render icon with new props', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'Close',
        size: 30,
        color: 'grey'
      }
    });

    expect(wrapper.findComponent(Close).exists()).toBeTruthy();
    expect(wrapper.findComponent(Close).props().color).toBe('grey');
    expect(wrapper.findComponent(Close).props().size).toBe(30);
  });
});
