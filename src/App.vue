<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useDoropomoStore } from './stores/doropomoStore';

const store = useDoropomoStore();

onMounted(() => {
  store.resetTimer();
});

onUnmounted(() => {
  store.resetTimer();
});

export default defineComponent({
  name: 'App',
});
</script>
