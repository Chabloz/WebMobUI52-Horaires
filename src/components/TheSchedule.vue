<script setup>
  import { ref, computed, watch} from 'vue';
  import schedule from '@/data/scheduleIM.json';
  import { useFetchJson } from '@/composables/useFetchJson.js';

  const scheduleRef = ref(schedule);
  const search = ref('');
  const showAll = ref(false);


  const {data, error, loading} = useFetchJson('/api/schedule/all');

  const scheduleSorted = computed(() => {
    return scheduleRef.value.sort((a, b) => {
      const startA = new Date(a.start).getTime();
      const startB = new Date(b.start).getTime();
      return startA - startB;
    });
  });

  const scheduleAfterNow = computed(() => {
    if (showAll.value) {
      return scheduleSorted.value;
    }
    const now = new Date().getTime();
    return scheduleSorted.value.filter(entry => {
      const end = new Date(entry.end).getTime();
      return end >= now;
    });
  });

  const scheduleFiltered = computed(() => {
    return scheduleAfterNow.value.filter(entry => {
      const label = entry.label.toLowerCase();
      const searchTerm = search.value.toLowerCase();
      return label.includes(searchTerm);
    });
  });
</script>

<template>
  <p v-if="error">{{  error }}</p>
  <p v-if="loading">Chargement en cours....</p>
  Horaires
  <input type="checkbox" v-model="showAll">
  <input type="search" placeholder="Search" v-model="search">
  <ul>
    <li v-for="entry of scheduleFiltered" :key="entry.id">
      {{ entry.start }} {{  entry.label }}
    </li>
  </ul>

</template>

<style scoped>

</style>