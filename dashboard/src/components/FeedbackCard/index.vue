<template>
  <div id="feedback-card" @click="handleToggle" class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray">
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" id="field-badge"/>

      <span class="font-regular text-brand-graydark" id="field-createdAt">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800" id="field-text">
      {{ feedback.text }}
    </div>

    <div
      :class="{
        animate__fadeOutUp: state.isClosing
      }"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="state.isOpen"
      id="open-card"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Página</span>
          <span class="font-medium text-gray-700" id="field-page">{{ feedback.page }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Dispositivo</span>
          <span class="font-medium text-gray-700" id="field-device">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Usuário</span>
          <span class="font-medium text-gray-700" id="field-fingerprint">{{ feedback.fingerprint }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-if="!state.isOpen" id="close-chevron">
      <icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import Badge from './Badge.vue';
import getDiffTimeBetweenCurrentDate from '../../utils/date';
import palette from '../../../palette';
import Icon from '../Icon/index.vue';
import wait from '../../utils/timeout';

export default {
  components: { Badge, Icon },
  props: {
    feedback: { type: Object, required: true },
    isOpened: { type: Boolean, default: false }
  },
  setup (props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    });

    async function handleToggle () {
      state.isClosing = true;

      await wait(250);
      state.isOpen = !state.isOpen;
      state.isClosing = false;
    }

    return {
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand,
      state
    };
  }
};
</script>
