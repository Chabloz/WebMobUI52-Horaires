<script setup>
import { usePWAInstall } from '@/composables/usePWAInstall.js';
import { useQuasar } from 'quasar';

const { canInstall, isInstalled, installPWA, dismissInstall } = usePWAInstall();
const $q = useQuasar();

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
  } else {
    $q.notify({
      message: 'Erreur lors de l\'installation',
      color: 'negative',
      icon: 'error',
      timeout: 3000
    });
  }
}

function handleDismiss() {
  dismissInstall();
  $q.notify({
    message: 'Rappel d\'installation masqué',
    color: 'info',
    icon: 'visibility_off',
    timeout: 2000
  });
}
</script>

<template>
  <!-- Install Button -->
  <q-btn
    v-if="canInstall && !isInstalled"
    @click="handleInstall"
    color="primary"
    icon="download"
    label="Installer l'app"
    dense
    class="q-mr-sm"
  />

  <!-- Install Banner (more prominent) -->
  <q-banner
    v-if="canInstall && !isInstalled"
    class="bg-primary text-white q-mb-md"
    dense
  >
    <template v-slot:avatar>
      <q-icon name="download" />
    </template>

    <div class="text-body2">
      Installez cette application pour un accès rapide et hors ligne
    </div>

    <template v-slot:action>
      <q-btn
        @click="handleInstall"
        color="white"
        text-color="primary"
        label="Installer"
        size="sm"
        unelevated
      />
      <q-btn
        @click="handleDismiss"
        color="white"
        text-color="primary"
        icon="close"
        size="sm"
        flat
        dense
      />
    </template>
  </q-banner>

  <!-- Already installed indicator -->
  <div v-if="isInstalled" class="text-caption text-positive q-pa-sm">
    <q-icon name="check_circle" class="q-mr-xs" />
    Application installée
  </div>
</template>
