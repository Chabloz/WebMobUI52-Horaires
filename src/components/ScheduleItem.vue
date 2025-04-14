<script setup>
  defineProps({
    entry: {
      type: Object,
      required: true
    }
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${dayOfWeek} ${day}.${month}`;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
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
      <div>{{ entry.label }}</div>
      <div>{{ entry.class }}</div>
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
</style>