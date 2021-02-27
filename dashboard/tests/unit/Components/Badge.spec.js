import { shallowMount } from '@vue/test-utils';
import Badge from '../../../src/components/FeedbackCard/Badge.vue';

describe('<Badge />', () => {
  it('should render badge IDEA correctly', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        type: 'IDEA'
      }
    });

    expect(wrapper.find('#bagde-component').text()).toBe('idéia');
    expect(wrapper.find('#bagde-component').classes()).toContain('bg-brand-warning');
  });

  it('should render badge other type', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        type: 'BANANA'
      }
    });

    expect(wrapper.find('#bagde-component').text()).toBe('outros');
    expect(wrapper.find('#bagde-component').classes()).toContain('bg-brand-graydark');
  });
});
