<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';

const { issuesQuery } = useIssues();

</script>

<template>
  <div class="row q-mb-md">
    <span class="text-h4">GitGub Issues</span>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!-- Todo: Filters -->
      <FilterSelector />
    </div>

    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="issuesQuery.isLoading.value" />
      <IssueList v-else :issues="issuesQuery.data.value"/>
    </div>
  </div>
</template>

<style scoped></style>
