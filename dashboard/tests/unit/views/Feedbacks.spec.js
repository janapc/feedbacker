import { flushPromises, mount, shallowMount } from '@vue/test-utils';

import Feedbacks from '../../../src/views/Feedbacks/index.vue';
import FeedbackCard from '../../../src/components/FeedbackCard/index.vue';
import Filters from '../../../src/views/Feedbacks/Filters.vue';

import services from '../../../src/services';
import wait from '../../../src/utils/timeout';

import mockData from './getFeedbacks.json';

jest.mock('../../../src/services');

describe('<Feedbacks />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render Feedbacks correctly', () => {
    services.feedbacks.getAll.mockReturnValue(mockData.all);

    const wrapper = shallowMount(Feedbacks);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should show all the feedbacks', async () => {
    services.feedbacks.getAll.mockReturnValue(mockData.all);

    const wrapper = shallowMount(Feedbacks);

    await wait(500);

    expect(services.feedbacks.getAll).toBeCalledWith({ limit: 5, offset: 0, type: '' });

    expect(wrapper.findAllComponents(FeedbackCard).length).toEqual(2);
  });

  it('Should show only a filter specific', async () => {
    services.feedbacks.getAll
      .mockReturnValueOnce(mockData.all)
      .mockReturnValueOnce(mockData.filterSpecific);
    services.feedbacks.getSummary.mockReturnValueOnce({
      all: 2,
      issue: 1,
      idea: 0,
      other: 1
    });

    const wrapper = mount(Feedbacks);

    await wait(500);

    expect(wrapper.findComponent(Filters).exists()).toBe(true);
    expect(wrapper.findAllComponents(FeedbackCard).length).toEqual(2);
    expect(services.feedbacks.getAll).toBeCalledWith({ limit: 5, offset: 0, type: '' });
    expect(services.feedbacks.getSummary).toBeCalled();

    await wrapper.find('#Problemas-filter').trigger('click');
    await flushPromises();

    expect(services.feedbacks.getAll).toBeCalledWith({ limit: 5, offset: 0, type: 'issue' });
    expect(wrapper.findAllComponents(FeedbackCard).length).toEqual(1);
  });

  it('Should show more feedbacks', async () => {
    services.feedbacks.getAll
      .mockReturnValueOnce(mockData.all)
      .mockReturnValueOnce(mockData.newPage);

    const wrapper = shallowMount(Feedbacks);

    await wait(500);

    window.dispatchEvent(new Event('scroll'));

    expect(services.feedbacks.getAll).toBeCalledWith({ limit: 5, offset: 0, type: '' });
    expect(services.feedbacks.getAll).toBeCalledWith({ limit: 5, offset: 0, type: '' });

    await wait(500);

    expect(wrapper.findAllComponents(FeedbackCard).length).toEqual(3);
  });

  it('Should return a message error if not have the feedbacks', async () => {
    services.feedbacks.getAll.mockReturnValueOnce({
      data: {
        results: [],
        pagination: {
          limit: 5,
          offset: 0
        }
      }
    });
    const wrapper = shallowMount(Feedbacks);

    await wait(500);

    expect(wrapper.find('#feedbacks-empty-message').text()).toEqual(
      'Ainda nenhum feedback recebido 🤓'
    );
  });

  it('Should return a message error if not load the feedbacks', async () => {
    services.feedbacks.getAll.mockReturnValueOnce({});

    const wrapper = shallowMount(Feedbacks);

    await wait(500);

    expect(wrapper.find('#hasError-message').text()).toEqual(
      'Aconteceu um erro ao carregar os feedbacks 😔'
    );
  });
});
