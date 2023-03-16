<template>
  <q-page class="row items-center justify-center">
    <div v-if="user" class="column items-center justify-center q-gutter-y-xl">
      <p class="text-h3">Olá {{ user.user_metadata.name }}</p>
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
