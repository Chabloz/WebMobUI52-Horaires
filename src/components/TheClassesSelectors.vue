<script setup>
import { computed } from 'vue';

const { schedule } = defineProps({
  schedule: {
    type: Array,
    required: true
  }
});

const allClasses = computed(() => {
  const classes = new Set(schedule.map(entry => entry.class));
  return Array.from(classes).sort((a, b) => a.localeCompare(b));
});

const curClasses = defineModel({
  type: Array,
  default: []
});

function toggleClass(className) {
  if (curClasses.value.includes(className)) {
    curClasses.value = curClasses.value.filter(c => c !== className);
  } else {
    curClasses.value.push(className);
  }
}
</script>

<template>
  <div class="class-buttons q-pb-md">
    <q-btn
      v-for="className in allClasses"
      :key="className"
      :label="className"
      :color="curClasses.includes(className) ? 'primary' : 'secondary'"
      class="q-ma-xs"
      dense
      @click="toggleClass(className)"
    />
  </div>
</template>