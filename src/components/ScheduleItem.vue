<script setup>
  import { useJsonStorage } from '@/composables/useJsonStorage.js';
  import { formatDate, formatTime } from '@/utils/dateFr.js';

  const {entry} = defineProps({
    entry: {
      type: Object,
      required: true
    }
  });

  const emits = defineEmits(['search-changed']);

  function onLabelClick() {
    emits('search-changed', entry.label);
  }
</script>

<template>
  <q-item>
    <q-item-section top class="col-2 column-divider">
      <div class="text-weight-bold">{{ formatDate(entry.start) }}</div>
    </q-item-section>

    <q-item-section top class="col-2 column-divider">
      <div>{{ formatTime(entry.start) }}</div>
      <div>{{ formatTime(entry.end) }}</div>
    </q-item-section>

    <q-item-section top class="column-divider">
      <div class="label" @click="onLabelClick">{{ entry.label }}</div>
      <div class="class-name">{{ entry.class }}</div>
    </q-item-section>

    <q-item-section top>
      {{ entry.room }}
    </q-item-section>
  </q-item>
</template>

<style scoped>
  .column-divider {
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    padding-right: 12px;
    margin-right: 12px;
  }
  div.label {
    cursor: pointer;
    text-decoration: underline;
  }

  .class-name, .label {
    padding-right: 0.2rem;
  }
</style>