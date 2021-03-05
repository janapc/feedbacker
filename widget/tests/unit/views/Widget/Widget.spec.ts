import { mount } from '@vue/test-utils';

import Widget from '../../../../src/views/Widget/index.vue';
import Standby from '../../../../src/views/Widget/Standby.vue';
import Box from '../../../../src/views/Widget/Box.vue';

import Wizard from '../../../../src/components/Wizard/index.vue';
import Icon from '../../../../src/components/Icon/index.vue';

import { setCurrentComponent, setFeedbackType } from '../../../../src/store';
import useStore from '../../../../src/hooks/useStore';

jest.mock('../../../../src/hooks/useIframeControl', () => () => ({
  updateCoreValuesOnStore: jest.fn(),
  notifyOpen: jest.fn(),
  notifyClose: jest.fn()
}));

jest.mock('../../../../src/hooks/useNavigation', () => () => ({
  back: () => {
    setFeedbackType('');
    setCurrentComponent('SelectFeedbackType');
  }
}));

describe('<Widget />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('Should render Widget', () => {
    const wrapper = mount(Widget);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should render Widget and render the component Standby', () => {
    const wrapper = mount(Widget);
    const StandbyComponent = wrapper.findComponent(Standby);

    expect(StandbyComponent.exists()).toBeTruthy();
    expect(StandbyComponent.findComponent(Icon).props().name).toBe('Chat');
    expect(StandbyComponent.text()).toContain('Deixe um feedback');
  });

  it('Should render Widget,contain the component Standby and open the box', async () => {
    const wrapper = mount(Widget);

    expect(wrapper.vm.state.component).toBe('Standby');
    expect(wrapper.findComponent(Standby).exists()).toBeTruthy();

    await wrapper
      .findComponent(Standby)
      .find('#open-box')
      .trigger('click');

    await wrapper.vm.handleOpenBox();

    const BoxComponent = wrapper.findComponent(Box);
    expect(BoxComponent.exists()).toBeTruthy();
  });

  it('Should render Widget,contain the component Box', async () => {
    setFeedbackType('ISSUE');

    const wrapper = mount(Widget);

    await wrapper.vm.handleOpenBox();

    const BoxComponent = wrapper.findComponent(Box);

    expect(BoxComponent.exists()).toBeTruthy();
    expect(BoxComponent.find('#label').text()).toBe('Reporte um problema');
    expect(BoxComponent.findComponent(Wizard).exists()).toBeTruthy();

    expect(BoxComponent.find('#btn-goBack').attributes().class).toContain(
      'invisible'
    );
  });

  it('Should render Widget,contain the component Box and go back component', async () => {
    setFeedbackType('ISSUE');
    setCurrentComponent('writeAFeedback');

    const wrapper = mount(Widget);
    const store = useStore();

    await wrapper.vm.handleOpenBox();

    const BoxComponent = wrapper.findComponent(Box);

    expect(BoxComponent.exists()).toBeTruthy();
    expect(BoxComponent.find('#btn-goBack').attributes().class).not.toContain(
      'invisible'
    );

    await BoxComponent.find('#btn-goBack').trigger('click');

    expect(store.currentComponent).toBe('SelectFeedbackType');
    expect(store.feedbackType).toBe('');
  });

  it('Should render Widget,contain the component Box and close box', async () => {
    setFeedbackType('ISSUE');
    setCurrentComponent('writeAFeedback');
    const wrapper = mount(Widget);

    await wrapper.vm.handleOpenBox();
    expect(wrapper.vm.state.component).toBe('Box');
    const BoxComponent = wrapper.findComponent(Box);
    expect(BoxComponent.exists()).toBeTruthy();

    BoxComponent
      .find('#close-box')
      .trigger('click');

    await wrapper.vm.handleCloseBox();
    expect(wrapper.vm.state.component).toBe('Standby');
  });
});
