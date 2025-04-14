<script setup>
import { ref, computed, watchEffect, nextTick } from 'vue';
import scheduleIm from '@/data/scheduleIm.json';
import TheClassesSelectors from '@/components/TheClassesSelectors.vue';
import TheSearchInput from '@/components/TheSearchInput.vue';
import ScheduleItem from '@/components/ScheduleItem.vue';
import { useJsonStorage } from '@/composables/useJsonStorage.js';

const {data: search} = useJsonStorage('searchTerm', '');
const {data: selectedClasses} = useJsonStorage('selectedClasses', []);
const {data: showHistory} = useJsonStorage('showHistory', false);

const schedule = ref(scheduleIm);

const scheduleSorted = computed(() => {
  return schedule.value.sort((a, b) => new Date(a.start) - new Date(b.start));
});

const scheduleAfter = computed(() => {
  if (showHistory.value) return scheduleSorted.value;
  const now = new Date();
  return scheduleSorted.value.filter(entry => new Date(entry.end) >= now);
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

function resetAll() {
  search.value = '';
  selectedClasses.value = [];
  showHistory.value = false;
}
</script>

<template>
  <div>
    <TheClassesSelectors
      :schedule="schedule"
      v-model="selectedClasses"
    />

    <div class="flex justify-between">
      <q-checkbox v-model="showHistory" label="Afficher l'historique" dense/>
      <q-btn @click="resetAll" icon="restart_alt" label="Vider les filtres" dense flat />
    </div>

    <TheSearchInput v-model="search" />

    <q-list bordered separator class="q-mt-md">
      <ScheduleItem
        v-for="entry of scheduleFiltered"
        :key="entry.id"
        :entry="entry"
      />
    </q-list>
  </div>
</template>