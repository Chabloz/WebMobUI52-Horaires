<script setup>
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useJsonStorage } from '@/composables/useJsonStorage.js';
import { usePWAInstall } from '@/composables/usePWAInstall.js';

const $q = useQuasar();
const {data: isDark} = useJsonStorage('isDark', null);
const { canInstall, isInstalled, installPWA } = usePWAInstall();

function toggleDarkMode() {
  isDark.value = !isDark.value;
  $q.dark.set(isDark.value);
}

async function handleInstall() {
  const result = await installPWA();

  if (result.success) {
    $q.notify({
      message: 'Application installée avec succès!',
      color: 'positive',
      icon: 'download_done',
      timeout: 3000
    });
  } else if (result.outcome === 'dismissed') {
    $q.notify({
      message: 'Installation annulée',
      color: 'info',
      icon: 'info',
      timeout: 2000
    });
  }
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
          v-if="canInstall && !isInstalled"
          @click="handleInstall"
          flat
          round
          icon="download"
          aria-label="Installer l'application"
          class="q-mr-sm"
        />

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