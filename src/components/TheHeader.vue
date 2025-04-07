<script setup>
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useJsonStorage } from '@/composables/useJsonStorage.js';

const $q = useQuasar();
const {data: isDark} = useJsonStorage('isDark', null);

function toggleDarkMode() {
  isDark.value = !isDark.value;
  $q.dark.set(isDark.value);
}

onMounted(() => {
  if (isDark.value === null) {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  $q.dark.set(isDark.value);
});
</script>

<template>
  <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="logo.png" alt="Logo">
          </q-avatar>
          IM - Horaires
        </q-toolbar-title>

        <q-btn
          flat
          round
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
          aria-label="Toggle dark/light mode"
        />
      </q-toolbar>
    </q-header>
</template>

<style scoped>

</style>