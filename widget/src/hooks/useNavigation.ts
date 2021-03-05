import useStore from './useStore';

import { setCurrentComponent, setFeedbackType } from '../store';

export interface UseNavigation {
  next(): void;
  back(): void;
  setErrorState(): void;
  setSuccessState(): void;
}

export default function UseNavigation (): UseNavigation {
  const store = useStore();

  function next (): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback');
    }
  }

  function back (): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType');
      setFeedbackType('');
    }
  }

  function setErrorState (): void {
    setCurrentComponent('Error');
  }

  function setSuccessState (): void {
    setCurrentComponent('Success');
  }

  return { next, back, setErrorState, setSuccessState };
}
