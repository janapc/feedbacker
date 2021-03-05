import { mount } from '@vue/test-utils';

import useStore from '../../../../src/hooks/useStore';
import { resetStore, setCurrentComponent } from '../../../../src/store';

import Wizard from '../../../../src/components/Wizard/index.vue';
import SelectFeedbackType from '../../../../src/components/Wizard/SelectFeedbackType.vue';
import ErrorComponent from '../../../../src/components/Wizard/Error.vue';
import Success from '../../../../src/components/Wizard/Success.vue';
import WriteAFeedback from '../../../../src/components/Wizard/WriteAFeedback.vue';

import Icon from '../../../../src/components/Icon/index.vue';
import services from '../../../../src/services';

jest.mock('../../../../src/services', () => ({
  feedbacks: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        data: {
          type: '',
          text: 'testing the component',
          page: '',
          apiKey: '',
          device: 'banana',
          fingerprint: ''
        },
        errors: null
      })
      .mockReturnValueOnce({
        data: {
          type: '',
          text: '',
          fingerprint: '',
          device: '',
          page: '',
          apiKey: '',
          createdAt: ''
        },
        errors: {
          status: 500,
          statusText: 'Error internal'
        }
      })
  }
}));

describe('Wizard Component', () => {
  afterEach(() => {
    resetStore();
  });

  it('Should render component SelectFeedbackType', () => {
    const store = useStore();

    const wrapper = mount(Wizard);

    const SelecteFeedbackTypeComponent = wrapper.findComponent(
      SelectFeedbackType
    );

    expect(store.feedbackType).toEqual('');
    expect(store.currentComponent).toEqual('SelectFeedbackType');

    expect(SelecteFeedbackTypeComponent.exists()).toBeTruthy();
    expect(SelecteFeedbackTypeComponent.findAll('button').length).toEqual(3);

    SelecteFeedbackTypeComponent.find('#button-issue').trigger('click');

    expect(store.feedbackType).toEqual('ISSUE');
    expect(store.currentComponent).toEqual('WriteAFeedback');
  });

  it('Should render component Error', () => {
    const store = useStore();
    setCurrentComponent('Error');

    const wrapper = mount(Wizard);

    expect(store.currentComponent).toEqual('Error');

    expect(wrapper.findComponent(ErrorComponent).exists()).toBeTruthy();
    expect(
      wrapper
        .findComponent(ErrorComponent)
        .findComponent(Icon)
        .props().name
    ).toEqual('Attention');

    expect(wrapper.findComponent(ErrorComponent).text()).toContain(
      'Droga! Aconteceu algum erro.'
    );
    expect(
      wrapper.findComponent(ErrorComponent).find('#button-goBack')
    ).toBeTruthy();

    wrapper
      .findComponent(ErrorComponent)
      .find('#button-goBack')
      .trigger('click');

    expect(store.currentComponent).toEqual('SelectFeedbackType');
  });

  it('Should render component Success', () => {
    const store = useStore();
    setCurrentComponent('Success');

    const wrapper = mount(Wizard);

    expect(store.currentComponent).toEqual('Success');

    expect(wrapper.findComponent(Success).exists()).toBeTruthy();
    expect(
      wrapper
        .findComponent(Success)
        .findComponent(Icon)
        .props().name
    ).toEqual('Check');

    expect(wrapper.findComponent(Success).text()).toContain(
      'Obrigado! Recebemos o seu feedback.'
    );
    expect(wrapper.findComponent(Success).find('#button-goBack')).toBeTruthy();

    wrapper
      .findComponent(Success)
      .find('#button-goBack')
      .trigger('click');

    expect(store.currentComponent).toEqual('SelectFeedbackType');
  });

  it('Should render component WriteAFeedback, but with button disabled', () => {
    const store = useStore();
    setCurrentComponent('WriteAFeedback');

    const wrapper = mount(Wizard);

    expect(store.currentComponent).toEqual('WriteAFeedback');

    expect(wrapper.findComponent(WriteAFeedback).exists()).toBeTruthy();

    const btn = wrapper.findComponent(WriteAFeedback).find('#button-submit');
    expect(btn.attributes('disabled')).toBeDefined();
  });

  it('Should render component WriteAFeedback, send the message and navigation to component success', async () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: 'banana' });

    const store = useStore();
    setCurrentComponent('WriteAFeedback');

    const wrapper = mount(Wizard);

    expect(store.currentComponent).toEqual('WriteAFeedback');

    expect(wrapper.findComponent(WriteAFeedback).exists()).toBeTruthy();

    const btn = wrapper.findComponent(WriteAFeedback).find('#button-submit');
    const textarea = wrapper.findComponent(WriteAFeedback).find('textarea');

    expect(btn.attributes('disabled')).toBeDefined();
    expect(textarea.text()).toBe('');

    await textarea.setValue('testing the component');
    expect(wrapper.findComponent(WriteAFeedback).vm.state.feedback).toBe(
      'testing the component'
    );

    await btn.trigger('click');

    expect(services.feedbacks.create).toBeCalledWith({
      type: '',
      text: 'testing the component',
      page: '',
      apiKey: '',
      device: 'banana',
      fingerprint: ''
    });

    expect(store.currentComponent).toBe('Success');
    expect(store.message).toBe('testing the component');
    expect(wrapper.findComponent(Success).exists()).toBe(true);
  });

  it('Should render component WriteAFeedback, not send the message and navigation to component error', async () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: 'banana' });

    const store = useStore();
    setCurrentComponent('WriteAFeedback');

    const wrapper = mount(Wizard);

    expect(store.currentComponent).toEqual('WriteAFeedback');

    expect(wrapper.findComponent(WriteAFeedback).exists()).toBeTruthy();

    const btn = wrapper.findComponent(WriteAFeedback).find('#button-submit');
    const textarea = wrapper.findComponent(WriteAFeedback).find('textarea');

    expect(btn.attributes('disabled')).toBeDefined();
    expect(textarea.text()).toBe('');

    await textarea.setValue('testing the component');
    expect(wrapper.findComponent(WriteAFeedback).vm.state.feedback).toBe(
      'testing the component'
    );

    await btn.trigger('click');

    expect(services.feedbacks.create).toBeCalledWith({
      type: '',
      text: 'testing the component',
      page: '',
      apiKey: '',
      device: 'banana',
      fingerprint: ''
    });

    expect(store.currentComponent).toBe('Error');
    expect(store.message).toBe('testing the component');
    expect(wrapper.findComponent(ErrorComponent).exists()).toBe(true);
  });
});
