<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <icon name="Check" :color="palette.success" size="70" />

    <p class="text-xl font-black text-center w-full mt-2">
      Obrigado! Recebemos o seu feedback.
    </p>

    <div class="flex justify-center items-center w-full mt-2">
      <button
        id="button-goBack"
        @click="goBack"
        class="rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray items-center py-2 px-5 cursor-pointer focus:outline-none"
      >
        Envie mais feedbacks
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { resetStore } from '../../store';

import palette from '../../../palette';

import Icon from '../Icon/index.vue';

interface SetupReturn {
  goBack(): void;
  palette: Record<string, string>;
}

export default defineComponent({
  components: { Icon },
  setup (): SetupReturn {
    function goBack (): void {
      resetStore();
    }

    return {
      goBack,
      palette: palette.brand
    };
  }
});
</script>
