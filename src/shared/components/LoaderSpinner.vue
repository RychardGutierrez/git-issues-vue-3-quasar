<script setup lang="ts">
import { toRefs } from 'vue';

interface PropsLoader {
  color?: string;
  size?: string;
  thickness?: number;
  message?: string;
}

const props = withDefaults(defineProps<PropsLoader>(), {
  color: 'primary',
  size: '3rem',
  thickness: 2,
  message: 'Loading',
});

const { color, message, thickness, size } = toRefs(props);
</script>

<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thickness" />
    <span class="q-mt-sm">{{ message }}</span>
  </div>
</template>

<style scoped></style>
