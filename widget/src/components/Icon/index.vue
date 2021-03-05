<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue';
import Chat from './Chat.vue';
import Close from './Close.vue';
import ArrowRight from './ArrowRight.vue';
import Check from './Check.vue';
import Attention from './Attention.vue';

export default {
  components: {
    Loading,
    Chat,
    Close,
    ArrowRight,
    Check,
    Attention
  },
  props: {
    name: { type: String, required: true }
  }
};
</script>
