<script setup lang="ts">
import { ref, watch } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../../composables/useIssueMutation';
import { emit } from 'process';

interface Props {
  isOpen: boolean;
  labels: Array<string>;
}

interface Emits {
  (e: 'onClose'): void;
}

const { issueMutation } = useIssueMutation();

const isOpenRef = ref(false);

const title = ref<string>('');
const body = ref<string>('');
const labelsRef = ref<Array<string>>([]);

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

watch(props, () => {
  isOpenRef.value = props.isOpen;
});

watch(
  () => issueMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      emits('onClose');
      title.value = '';
      body.value = '';
      labelsRef.value = [];
      issueMutation.reset();
    }
  }
);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpenRef" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form
          @submit="issueMutation.mutate({ title, body, labels: labelsRef })"
        >
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Isue</div>
              <div class="text-grey">Add new issue with labels</div>
            </div>

            <q-space />

            <div>
              <q-input
                dense
                filled
                v-model="title"
                label="Title"
                placeholder="Title"
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-select
                dense
                filled
                v-model="labelsRef"
                multiple
                :options="props.labels"
                use-chips
                stack-label
                label="Multiple selecction"
                class="q-mb-sm"
              />
              <!-- Markdowm editor -->

              <MdEditor
                v-model="body"
                placeholder="# Markdowm"
                language="en-US"
              />
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn
              @click="emits('onClose')"
              :disable="issueMutation.isLoading.value"
              flat
              label="Cancel"
              v-close-popup
              color="dark"
            />

            <q-space />

            <q-btn
              :disable="issueMutation.isLoading.value"
              type="submit"
              flat
              label="Add Issue"
              color="dark"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
