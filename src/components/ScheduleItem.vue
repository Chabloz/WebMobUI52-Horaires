<script setup>
  defineProps({
    entry: {
      type: Object,
      required: true
    }
  });

  // Helper function to format the date as specified
  function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${dayOfWeek} ${day}.${month}`;
  }

  // Helper function to format time (HH:MM)
  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
</script>

<template>
  <q-item>
    <q-item-section top>
      <div class="text-weight-bold">{{ formatDate(entry.start) }}</div>
    </q-item-section>

    <q-item-section top class="content-width">
      <div>{{ formatTime(entry.start) }}</div>
      <div>{{ formatTime(entry.end) }}</div>
    </q-item-section>

    <q-item-section top>
      <div>{{ entry.label }}</div>
      <div>{{ entry.class }}</div>
    </q-item-section>

    <q-item-section top class="q-px-md">
      {{ entry.room }}
    </q-item-section>
  </q-item>
</template>