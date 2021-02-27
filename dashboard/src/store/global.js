import { reactive } from 'vue';

const globalInitialState = {
  isLoading: false
};

const state = reactive(globalInitialState);

export default state;

export function resetGlobalStore () {
  state.isLoading = false;
}

export function setGlobalLoading (status) {
  state.isLoading = status;
}
