<script setup>
  import { ref, computed, watchEffect, nextTick } from 'vue';
  import TheClassesSelectors from '@/components/TheClassesSelectors.vue';
  import TheSearchInput from '@/components/TheSearchInput.vue';
  import NetworkError from '@/components/NetworkError.vue';
  import ScheduleItem from '@/components/ScheduleItem.vue';
  import { useJsonStorage } from '@/composables/useJsonStorage.js';
  import { useFetchJson } from '@/composables/useFetchJson.js';

  const {data: search} = useJsonStorage('searchTerm', '');
  const {data: selectedClasses} = useJsonStorage('selectedClasses', []);
  const {data: showHistory} = useJsonStorage('showHistory', false);

  const {data: schedule, error, loading} = useFetchJson("/api/schedule/all");

  const scheduleSorted = computed(() => {
    if (!schedule.value) return [];
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

  function onSearchCourse(course) {
    search.value = course;
  }
</script>

<template>
  <div>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <NetworkError v-if="error" />

    <div v-if="schedule != null" class="q-pa-md">
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
          v-for="(entry, ind) of scheduleFiltered"
          :key="entry.id"
          :entry="entry"
          @search-course="onSearchCourse"
        />
      </q-list>
    </div>
  </div>
</template>