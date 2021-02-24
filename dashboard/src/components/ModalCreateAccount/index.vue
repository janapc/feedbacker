<template>
  <div class="flex justify-between" id="modal-create-account">
    <h1 class="text-4xl font-black text-gray-800">Crie uma conta</h1>

    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          type="text"
          :class="{
            'border-brand-danger': !!state.name.errorMessage
          }"
          v-model="state.name.value"
          placeholder="jane"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
        />
        <span class="block font-medium text-brand-danger" v-if="!!state.name.errorMessage">
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          v-model="state.email.value"
          placeholder="jane.dae@gmail.com"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
        />
        <span class="block font-medium text-brand-danger" v-if="!!state.email.errorMessage">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          v-model="state.password.value"
          placeholder="minhasenha123"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
        />
        <span class="block font-medium text-brand-danger" v-if="!!state.password.errorMessage">
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useField } from 'vee-validate';
import { useToast } from 'vue-toastification';

import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators';

import useModal from '../../hooks/useModal';
import services from '../../services';

import Icon from '../Icon/index.vue';

export default {
  components: { Icon },
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'name',
      validateEmptyAndLength3,
    );
    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validateEmptyAndEmail,
    );
    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
      'password',
      validateEmptyAndLength3,
    );

    const state = reactive({
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage,
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
      hasErrors: false,
      isLoading: false,
    });

    function close() {
      modal.close();
    }

    async function login({ email, password }) {
      const { data, errors } = await services.auth.login({
        email,
        password,
      });

      if (!errors) {
        window.localStorage.setItem('token', data.token);

        router.push({ name: 'Feedbacks' });
        modal.close();
      }
      state.isLoading = false;
    }

    async function handleSubmit() {
      try {
        toast.clear();

        state.isLoading = true;
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value,
        });
        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value,
          });
          return;
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar a conta');
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error('Ocorreu um erro ao criar a conta');
      }
    }

    return {
      state,
      close,
      handleSubmit,
    };
  },
};
</script>

<style></style>
