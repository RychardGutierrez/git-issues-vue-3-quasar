<script setup lang="ts">
import IssueCard from './IssueCard.vue';
import type { Issue } from '../../interfaces/issues';
import { toRefs } from 'vue';

interface IssueProps {
  issues: Array<Issue>;
}

const props = defineProps<IssueProps>();

const { issues } = toRefs(props);
</script>

<template>
  <div class="row q-pa-md">
    <IssueCard
      v-for="issue of issues"
      :key="issue.id"
      :issue="issue"
      :enabled-mouse-enter="true"
    />
  </div>
</template>

<style scoped>
</style>
