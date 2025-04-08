<script setup>
import { ref, computed, watchEffect, nextTick } from 'vue';
import scheduleIm from '@/data/scheduleIm.json';

const search = ref('');

const schedule = ref(scheduleIm);
const scheduleSorted = computed(() => {
  return schedule.value.sort((a, b) => new Date(a.start) - new Date(b.start));
});
const scheduleSortedAndAfterNow = computed(() => {
  return scheduleSorted.value.filter(
    entry => new Date(entry.end) >= new Date()
  );
});

const scheduleSortedAndAfterNowAndSearch = computed(() => {
  if (search.value === '') {
    return scheduleSortedAndAfterNow.value;
  }
  return scheduleSortedAndAfterNow.value.filter(entry => {
    return entry.label.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<template>
  <input type="search" placeholder="Search..." v-model="search">
  <ul>
    <li v-for="entry of scheduleSortedAndAfterNowAndSearch" :key="entry.id">
      {{  entry.start }} - {{ entry.label }}
    </li>
  </ul>
</template>

<style scoped>

</style>