<script setup lang="ts">
import { Button, Size } from 'src/issues/interfaces/issues';
import { toRefs } from 'vue';

interface ButtonsProps {
  buttons: Array<Button>;
}

const props = withDefaults(defineProps<ButtonsProps>(), {
  buttons: () => [
    {
      color: 'primary',
      icon: 'add',
      size: Size.Sm,
      action: () => ({}),
      id: '',
    },
  ],
});

const { buttons } = toRefs(props);
</script>

<template>
  <div class="fab">
    <q-btn
      v-for="button of buttons"
      @click="button.action"
      class="q-mr-sm"
      round
      :color="button.color"
      :icon="button.icon"
      :size="button.size"
      :key="button.id"
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
