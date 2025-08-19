import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Simple composable to track online/offline state
 * @returns {Object} - { isOnline, onReconnect }
 */
export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine);
  const reconnectCallbacks = [];

  function updateOnlineStatus() {
    const wasOffline = !isOnline.value;
    isOnline.value = navigator.onLine;

    // If we just came back online, execute reconnect callbacks
    if (wasOffline && isOnline.value) {
      reconnectCallbacks.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.warn('Error in reconnect callback:', error);
        }
      });
    }
  }

  function onReconnect(callback) {
    if (typeof callback === 'function') {
      reconnectCallbacks.push(callback);
    }
  }

  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  });

  return {
    isOnline,
    onReconnect
  };
}
