<script setup lang="ts">
import { ref } from 'vue';

import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from '../components/floating-button/FloatingButtons.vue';
import NewIssueDialog from '../components/issue-dialog/NewIssueDialog.vue';

import type { Button } from '../interfaces/issues';
import { Size } from '../interfaces/issues';
import useLabels from '../composables/useLabels';

const isOpen = ref(false);

const { issuesQuery } = useIssues();
const { labels } = useLabels();

const openDialog = () => {
  isOpen.value = true;
};

const buttons: Array<Button> = [
  {
    color: 'primary',
    icon: 'add',
    size: Size.Sm,
    action: openDialog,
    id: 'add-1',
  },
];
</script>

<template>
  <div class="row q-mb-md">
    <span class="text-h4">GitGub Issues</span>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-4">
      <FilterSelector />
    </div>

    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="issuesQuery.isLoading.value" />
      <IssueList v-else :issues="issuesQuery.data.value" />
    </div>

    <!-- FloatingButtons -->
    <FloatingButtons :buttons="buttons" />

    <!-- Dialong new issue -->

    <NewIssueDialog
      v-if="labels"
      :is-open="isOpen"
      :labels="labels?.map((label) => label.name) || []"
      @on-close="isOpen = false"
    />
  </div>
</template>

<style scoped></style>
