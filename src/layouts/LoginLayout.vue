<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Dark, LocalStorage } from 'quasar';
import { useApi } from 'src/composables/UseApi';

export default defineComponent({
  name: 'LoginLayout',
  setup() {
    const { getTheme } = useApi();

    onMounted(() => {
      getTheme();
      if (
        LocalStorage.getItem('darkmode') ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        LocalStorage.set('darkmode', true);
        Dark.set(true);
      } else if (
        !LocalStorage.getItem('darkmode') ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        LocalStorage.set('darkmode', false);
        Dark.set(false);
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          if (event.matches) {
            LocalStorage.set('darkmode', true);
            Dark.set(true);
          } else {
            LocalStorage.set('darkmode', false);
            Dark.set(false);
          }
        });
    });

    return {};
  },
});
</script>
