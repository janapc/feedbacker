import { mount } from '@vue/test-utils';

import Playground from '../../../../src/views/Playground/index.vue';
import Widget from '../../../../src/views/Widget/index.vue';

describe('<Playground />', () => {
  it('Should render Playground', () => {
    const wrapper = mount(Playground);

    expect(wrapper.findAll('h1').length).toBe(4);

    expect(wrapper.text()).toContain('Playground');

    expect(wrapper.findComponent(Widget).exists()).toBeTruthy();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
