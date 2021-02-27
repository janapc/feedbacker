import { reactive } from 'vue';

const userInitialState = {
  currentUser: {}
};

const state = reactive(userInitialState);

export default state;

export function resetUserStore () {
  state.currentUser = {};
}

export function cleanCurrentUser () {
  state.currentUser = {};
}

export function setCurrentUser (user) {
  state.currentUser = user;
}

export function setApiKey (apiKey) {
  const currentUser = { ...state.currentUser, apiKey };
  state.currentUser = currentUser;
}
