<script setup>
  import { ref } from 'vue';

  const isOpen = ref(true);

  function reloadPage() {
    location.reload();
  }
</script>

<template>
  <q-dialog persistent v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6  text-warning">
          <q-icon name="warning" size="sm" class="q-ma-sm" />
          Erreur de connexion
        </div>
        <div>
          <slot>
            Une erreur réseau s'est produite.
            Vérifiez votre connexion réseau et réessayez.
          </slot>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="Réessayer" @click="reloadPage" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>