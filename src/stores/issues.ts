import { defineStore } from 'pinia';
import { ref } from 'vue';
import { State } from '../issues/interfaces/issues';

export const useIssueStore = defineStore('issue', () => {
  const state = ref<State>(State.All);
  const labels = ref<Array<string>>([]);

  const toogleLabel = (labelName: string) => {
    if (labels.value.includes(labelName)) {
      labels.value = labels.value.filter((label) => label !== labelName);
      return;
    }

    labels.value.push(labelName);
  };

  return {
    //state properties
    state,
    labels,
    //getters

    //actions
    toogleLabel,
  };
});
