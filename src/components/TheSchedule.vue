<script setup>
  import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
  import TheClassesSelectors from '@/components/TheClassesSelectors.vue';
  import TheSearchInput from '@/components/TheSearchInput.vue';
  import NetworkError from '@/components/NetworkError.vue';
  import ScheduleItem from '@/components/ScheduleItem.vue';
  import { useJsonStorage } from '@/composables/useJsonStorage.js';
  import { useFetchJson } from '@/composables/useFetchJson.js';
  import { useOnlineStatus } from '@/composables/useOnlineStatus.js';
  import { useQuasar } from 'quasar';
  import { textIncludes } from '@/utils/textUtils.js';

  const { data: search } = useJsonStorage('searchTerm', '');
  const { data: selectedClasses } = useJsonStorage('selectedClasses', []);
  const { data: showHistory } = useJsonStorage('showHistory', false);

  const { data: schedule, error, execute: reloadSchedule } = useFetchJson("/api/schedule/all.json");
  const { onReconnect } = useOnlineStatus();

  onReconnect(() => reloadSchedule());

  function handleVisibilityChange() {
    if (!document.hidden) reloadSchedule();
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

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
      filtered = filtered.filter(entry => selectedClasses.value.includes(entry.class));
    }
    if (search.value) {
      filtered = filtered.filter(entry => textIncludes(entry.label, search.value));
    }
    return filtered;
  });

  function resetAll() {
    search.value = '';
    selectedClasses.value = [];
    showHistory.value = false;
  }

  const $q = useQuasar();
  const zebraColor = ref('#f5f5f5');
  watchEffect(() => {
    zebraColor.value = $q.dark.isActive ? '#222222' : '#f5f5f5';
  });

  function changeSearchTerm(label) {
    search.value = label;
  }
</script>

<template>
  <div>
    <NetworkError v-if="error" />

    <div v-if="schedule != null" class="q-pa-md">
      <TheClassesSelectors
        :schedule="schedule"
        v-model="selectedClasses"
      />

      <div class="flex justify-between">
        <q-checkbox v-model="showHistory" label="Afficher l'historique" dense/>
        <div class="q-gutter-sm">
          <q-btn @click="resetAll" icon="restart_alt" label="Vider les filtres" dense flat />
        </div>
      </div>

      <TheSearchInput v-model="search" />

      <q-list bordered separator class="q-mt-md">
        <ScheduleItem
          v-for="(entry, ind) of scheduleFiltered"
          :key="entry.id"
          :entry="entry"
          :class="ind % 2 === 0 ? 'zebra' : ''"
          @search-changed="changeSearchTerm($event)"
        />
      </q-list>
    </div>
  </div>
</template>

<style scoped>
  .zebra {
    background-color: v-bind('zebraColor');
  }
</style>