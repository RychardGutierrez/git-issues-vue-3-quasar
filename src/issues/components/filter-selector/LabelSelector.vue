<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from '../../composables/useLabels';

const { labels, isLoading, toogleLabel, selectedLabels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner v-if="isLoading" size="50px" :thickness="1" message="" />

    <q-chip
      v-else
      v-for="label of labels"
      @click="toogleLabel(label.name)"
      :outline="!selectedLabels.includes(label.name)"
      :key="label.id"
      clickable
      :style="{ color: `#${label.color}` }"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>
