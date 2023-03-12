<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="user">
      <p>Olá {{ user.user_metadata.name }}</p>
    </div>
  </q-page>
</template>
<script lang="ts">
import { useAuthUser } from 'src/composables/UseAuthUser';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PerfilPage',
  setup() {
    const { user } = useAuthUser();

    return { user };
  },
});
</script>
