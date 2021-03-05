import useNavigation from '../../../src/hooks/useNavigation';
import useStore from '../../../src/hooks/useStore';

import { setCurrentComponent, setFeedbackType } from '../../../src/store';

describe('UseNavigation', () => {
  it('Should go to next component', () => {
    const { next } = useNavigation();
    const store = useStore();

    expect(store.currentComponent).toEqual('SelectFeedbackType');

    next();

    expect(store.currentComponent).toEqual('WriteAFeedback');
  });

  it('Should go back to the component previous', () => {
    const { back } = useNavigation();
    const store = useStore();

    setCurrentComponent('WriteAFeedback');
    setFeedbackType('issue');

    expect(store.currentComponent).toEqual('WriteAFeedback');
    expect(store.feedbackType).toEqual('issue');

    back();

    expect(store.currentComponent).toEqual('SelectFeedbackType');
    expect(store.feedbackType).toEqual('');
  });

  it('Should update the component with the component of Success', () => {
    const { setSuccessState } = useNavigation();
    const store = useStore();

    setSuccessState();

    expect(store.currentComponent).toEqual('Success');
  });

  it('Should update the component with the component of Error', () => {
    const { setErrorState } = useNavigation();
    const store = useStore();

    setErrorState();

    expect(store.currentComponent).toEqual('Error');
  });
});
