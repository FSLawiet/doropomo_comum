<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="user">
      <p>Olá {{ user.user_metadata.name }}</p>
      <div class="flex">
        <DoropomoTimer id="rest" title="Rest" />
        <DoropomoTimer id="short" title="Short Work" />
        <DoropomoTimer id="long" title="Long Work" />
      </div>
      <DoropomoProfileClock />
    </div>
  </q-page>
</template>
<script lang="ts">
import { useAuthUser } from 'src/composables/UseAuthUser';
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'PerfilPage',
  components: {
    DoropomoTimer: defineAsyncComponent(
      () => import('components/DoropomoTimer.vue')
    ),
    DoropomoProfileClock: defineAsyncComponent(
      () => import('components/DoropomoProfileClock.vue')
    ),
  },
  setup() {
    const { user } = useAuthUser();

    return { user };
  },
});
</script>
