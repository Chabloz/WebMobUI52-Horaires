<script setup>
  import TheHeader from '@/components/TheHeader.vue';
  import TheFooter from '@/components/TheFooter.vue';
  import TheSchedule from '@/components/TheSchedule.vue';

  fetch('/api/schedule/all');
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <TheHeader />

    <q-page-container>
      <q-page padding>
        <TheSchedule />
      </q-page>
    </q-page-container>

    <TheFooter />
  </q-layout>
</template>

<style scoped>
.q-toolbar-title {
  text-align: center;
}

h2 {
  margin-top: 0;
}
</style>