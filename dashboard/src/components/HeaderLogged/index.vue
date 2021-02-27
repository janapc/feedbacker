<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="logo" />
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
        id="router-credencials"
          @click="changeRouter('Credencials')"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
        >
          Credencias
        </li>

        <li
          @click="changeRouter('Feedbacks')"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>

        <li id="logout-button" @click="handleLogout" class="px-6 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main focus:outline-none">{{ logoutLabel }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import useStore from '../../hooks/useStore';
import { cleanCurrentUser } from '../../store/user';

export default {
  setup () {
    const router = useRouter();
    const store = useStore('User');

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...';
      }

      return `${store.currentUser.name} (sair)`;
    });

    function changeRouter (name) {
      router.push({ name });
    }

    function handleLogout () {
      window.localStorage.removeItem('token');
      cleanCurrentUser();
      router.push(
        { name: 'Home' }
      );
    }

    return {
      changeRouter,
      logoutLabel,
      handleLogout
    };
  }
};
</script>

<style></style>
