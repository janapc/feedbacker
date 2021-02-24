import { shallowMount, flushPromises } from '@vue/test-utils';

import FeedbackCard from '../../../src/components/FeedbackCard/index.vue';

jest.mock('../../../src/utils/timeout');
jest.mock('../../../src/utils/date', () => () => '98 dias atrás');

describe('<FeedbackCard />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should render feedback card correctly', async () => {
    const wrapper = shallowMount(FeedbackCard, {
      props: {
        feedback: {
          text: 'Banana Banana!',
          fingerprint: '123',
          id: '1',
          apiKey: 'kaidke-123',
          type: 'OTHER',
          device: 'Chrome 85.0, macOS 10.14',
          page: 'https://banana.com/banana',
          createdAt: 1605225600000,
        },
        isOpened: false,
      },
    });

    const bagde = wrapper.findComponent('#field-badge');
    const fieldText = wrapper.find('#field-text');
    const fieldCreatedAt = wrapper.find('#field-createdAt');
    const openCard = wrapper.find('#open-card');
    const closeChevron = wrapper.find('#close-chevron');

    expect(bagde.exists()).toBe(true);
    expect(bagde.props().type).toBe('OTHER');

    expect(fieldText.text()).toBe('Banana Banana!');
    expect(fieldCreatedAt.text()).toBe('98 dias atrás');
    expect(openCard.exists()).toBe(false);
    expect(closeChevron.isVisible()).toBe(true);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should open feedback card', async () => {
    const wrapper = shallowMount(FeedbackCard, {
      props: {
        feedback: {
          text: 'Banana Banana!',
          fingerprint: '123',
          id: '1',
          apiKey: 'kaidke-123',
          type: 'OTHER',
          device: 'Chrome 85.0, macOS 10.14',
          page: 'https://banana.com/banana',
          createdAt: 1605225600000,
        },
      },
    });

    const btnToggle = wrapper.find('#feedback-card');

    await btnToggle.trigger('click');
    await flushPromises();

    expect(wrapper.findComponent('#field-badge').exists()).toBe(true);
    expect(wrapper.findComponent('#field-badge').props().type).toBe('OTHER');

    expect(wrapper.find('#open-card').exists()).toBe(true);

    expect(wrapper.find('#field-text').text()).toBe('Banana Banana!');
    expect(wrapper.find('#field-createdAt').text()).toBe('98 dias atrás');
    expect(wrapper.find('#field-page').text()).toBe('https://banana.com/banana');
    expect(wrapper.find('#field-device').text()).toBe('Chrome 85.0, macOS 10.14');
    expect(wrapper.find('#field-fingerprint').text()).toBe('123');
    expect(wrapper.find('#close-chevron').exists()).toBe(false);
  });
});
