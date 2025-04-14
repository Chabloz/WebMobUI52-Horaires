<script setup>
import { computed } from 'vue';

const { schedule } = defineProps({
  schedule: {
    type: Array,
    required: true
  }
});

const curClasses = defineModel({
  type: Array,
  default: []
});

const allClasses = computed(() => {
  const classes = new Set(schedule.map(entry => entry.class));
  return Array.from(classes).sort((a, b) => a.localeCompare(b));
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
      class="q-mr-sm q-mb-sm q-pr-sm q-pl-sm"
      dense
      @click="toggleClass(className)"
    >
      <q-icon
        v-if="curClasses.includes(className)"
        name="check"
        class="q-mr-xs"
        size="xs"
      />
    </q-btn>
  </div>
</template>