<script setup>
import { ref, computed, watchEffect, nextTick } from 'vue';
import scheduleIm from '@/data/scheduleIm.json';
import TheClassesSelectors from '@/components/TheClassesSelectors.vue';
import TheSearchInput from '@/components/TheSearchInput.vue';
import ScheduleItem from '@/components/ScheduleItem.vue';

const search = ref('');
const selectedClasses = ref([]);

const schedule = ref(scheduleIm);

const scheduleSorted = computed(() => {
  return schedule.value.sort((a, b) => new Date(a.start) - new Date(b.start));
});

const scheduleAfter = computed(() => {
  return scheduleSorted.value.filter(
    entry => new Date(entry.end) >= new Date()
  );
});

const scheduleFiltered = computed(() => {
  let filtered = scheduleAfter.value;
  if (selectedClasses.value.length > 0) {
    filtered = scheduleAfter.value.filter(entry => {
      return selectedClasses.value.includes(entry.class);
    });
  }
  if (search.value) {
    filtered = filtered.filter(entry => {
      return entry.label.toLowerCase().includes(search.value.toLowerCase());
    });
  }
  return filtered;
});

</script>

<template>
  <TheClassesSelectors
    :schedule="schedule"
    v-model="selectedClasses"
  />
  <TheSearchInput v-model="search" />

  <q-list bordered separator>
    <ScheduleItem
      v-for="entry of scheduleFiltered"
      :key="entry.id"
      :entry="entry"
    />
  </q-list>
</template>