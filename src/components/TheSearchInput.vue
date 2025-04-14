<script setup>
  const model = defineModel();
</script>

<template>
  <q-input
    dense
    filled
    v-model="model"
    placeholder="Search"
  />
</template>