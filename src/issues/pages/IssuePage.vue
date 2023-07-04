<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id = '' } = route.params;

const { issueQuery, issueQueryComments } = useIssue(Number(id));
</script>

<template>
  <RouterLink to="/" class="text-white">Go Back</RouterLink>

  <!-- Header -->
  <LoaderSpinner
    v-if="issueQuery.isLoading.value"
    :thickness="1"
    size="1.5rem"
    message=""
  />

  <IssueCard
    v-else-if="issueQuery.data.value"
    :issue="issueQuery.data.value"
  />

  <p v-else>Issues with ID {{ id }} not found</p>

  <!-- Comments -->

  <LoaderSpinner
    v-if="issueQueryComments.isLoading.value"
    :thickness="1"
    size="1.5rem"
    message=""
  />
  <div class="column">
    <span class="text-h3 q-mb-md"
      >Comments ({{ issueQueryComments.data.value?.length || 0 }})</span
    >
    <IssueCard
      v-for="comment of issueQueryComments.data.value"
      :key="comment.id"
      :issue="comment"
    />
  </div>
</template>

<style scoped></style>
