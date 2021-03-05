<template>
  <div class="box animate__animated animate_fadeInUp animate__faster" id="box">
    <header
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo
      }"
      class="relative w-full flex"
    >
      <button
        id="btn-goBack"
        v-if="canShowAdditionalControlAndInfo"
        @click="back"
        :disabled="canGoBack"
        :class="{ invisible: canGoBack }"
        class="text-xl text-gray-800 focus:outline-none"
      >
        <icon name="ArrowRight" :color="colors.gray['800']" />
      </button>

      <p
        id="label"
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl font-black text-center text-brand-main"
      >
        {{ label }}
      </p>

      <button
        id="close-box"
        @click="() => emit('close-box')"
        class="text-xl text-gray-800 focus:outline-none"
      >
        <icon size="14" name="Close" :color="colors.gray['800']" />
      </button>
    </header>

    <wizard />

    <footer
      class="text-gray-800 text-sm flex"
      v-if="canShowAdditionalControlAndInfo"
    >
      <icon class="mr-1" name="Chat" :color="brandColors.graydark" />
      widget by
      <span class="ml-1 font-bold">feedbacker</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue';
import colors from 'tailwindcss/colors';
import { brand } from '../../../palette';

import useStore from '../../hooks/useStore';
import useNavigation, { UseNavigation } from '../../hooks/useNavigation';

import Icon from '../../components/Icon/index.vue';
import Wizard from '../../components/Wizard/index.vue';

interface SetupReturn {
  emit: SetupContext['emit'];
  label: ComputedRef<string>;
  canGoBack: ComputedRef<boolean>;
  canShowAdditionalControlAndInfo: ComputedRef<boolean>;
  brandColors: Record<string, string>;
  colors: Record<string, string>;
  back: UseNavigation['back'];
}

export default defineComponent({
  emits: ['close-box'],
  components: { Icon, Wizard },
  setup (_, { emit }: SetupContext): SetupReturn {
    const store = useStore();
    const { back } = useNavigation();

    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema';
      }
      if (store.feedbackType === 'IDEA') {
        return 'Nos false a sua idéia';
      }

      if (store.feedbackType === 'OTHER') {
        return 'Abra sua mente';
      }
      return 'O que você tem em mente?';
    });
    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'SelectFeedbackType';
    });

    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return (
        store.currentComponent !== 'Success' &&
        store.currentComponent !== 'Error'
      );
    });

    return {
      emit,
      label,
      canGoBack,
      canShowAdditionalControlAndInfo,
      colors,
      brandColors: brand,
      back
    };
  }
});
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
