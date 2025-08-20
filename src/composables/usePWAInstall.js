import { ref, onMounted } from 'vue';

export function usePWAInstall() {
  const canInstall = ref(false);
  const isInstalled = ref(false);
  const deferredPrompt = ref(null);


  function checkIfInstalled() {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled.value = true;
      return true;
    }

    if (window.navigator.standalone === true) {
      isInstalled.value = true;
      return true;
    }

    if (document.referrer.includes('android-app://')) {
      isInstalled.value = true;
      return true;
    }

    return false;
  };

  async function installPWA() {
    if (!deferredPrompt.value) {
      return { success: false, error: 'No install prompt available' };
    }

    try {
      deferredPrompt.value.prompt();

      const { outcome } = await deferredPrompt.value.userChoice;

      if (outcome === 'accepted') {
        canInstall.value = false;
        isInstalled.value = true;
        deferredPrompt.value = null;
        return { success: true, outcome };
      } else {
        return { success: false, outcome };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  function dismissInstall() {
    canInstall.value = false;
    deferredPrompt.value = null;
  };

  onMounted(() => {
    if (checkIfInstalled()) return;

    window.addEventListener('beforeinstallprompt', (evt) => {
      evt.preventDefault();
      deferredPrompt.value = evt;
      canInstall.value = true;
    });

    window.addEventListener('appinstalled', () => {
      isInstalled.value = true;
      canInstall.value = false;
      deferredPrompt.value = null;
    });
  });

  return {
    canInstall,
    isInstalled,
    installPWA,
    dismissInstall
  };
}
