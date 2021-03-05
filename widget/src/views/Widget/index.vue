<template>
  <teleport to="body">
    <component
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
      :is="state.component"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';

import useIframeControl from '../../hooks/useIframeControl';

import Standby from './Standby.vue';
import Box from './Box.vue';

import useStore from '../../hooks/useStore';

type State = {
  component: string;
};

interface SetupReturn {
  state: State;
  handleOpenBox(): void;
  handleCloseBox(): void;
}

export default defineComponent({
  components: { Standby, Box },
  setup (): SetupReturn {
    const iframeControl = useIframeControl();

    const state = reactive<State>({
      component: 'Standby'
    });

    const store = useStore();

    watch(
      () => store.currentComponent,
      () => {
        iframeControl.updateCoreValuesOnStore();
      }
    );

    function handleOpenBox (): void {
      iframeControl.notifyOpen();
      state.component = 'Box';
    }

    function handleCloseBox (): void {
      iframeControl.notifyClose();
      state.component = 'Standby';
    }

    return {
      state,
      handleOpenBox,
      handleCloseBox
    };
  }
});
</script>
