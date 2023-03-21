<template>
  <q-page class="row items-center justify-center">
    <div class="column items-center justify-center q-gutter-y-xl">
      <div class="flex items-center justify-center">
        <DoropomoTimer id="rest" title="Rest" />
        <DoropomoTimer id="short" title="Short Work" />
        <DoropomoTimer id="long" title="Long Work" />
      </div>
      <DoropomoProfileClock />
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'DoropomoPage',
  components: {
    DoropomoTimer: defineAsyncComponent(
      () => import('components/DoropomoTimer.vue')
    ),
    DoropomoProfileClock: defineAsyncComponent(
      () => import('components/DoropomoProfileClock.vue')
    ),
  },
});
</script>
