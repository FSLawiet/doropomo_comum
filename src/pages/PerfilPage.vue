<template>
  <q-page padding class="row items-center justify-center q-gutter-x-md">
    <div v-if="user" class="col-12 items-center justify-center q-gutter-y-xl">
      <p class="text-h3 text-center">Olá {{ user.user_metadata.name }}</p>
    </div>
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <CardDashboard
        :table="card.table"
        :label="card.label"
        :icon="card.icon"
      />
    </div>
  </q-page>
</template>
<script lang="ts">
import { useAuthUser } from 'src/composables/UseAuthUser';
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  name: 'PerfilPage',
  components: {
    CardDashboard: defineAsyncComponent(
      () => import('components/CardDashboard.vue')
    ),
  },
  setup() {
    const { user } = useAuthUser();
    const cards = ref([
      {
        label: 'Categorias',
        table: 'category',
        icon: 'category',
      },
      {
        label: 'Produtos',
        table: 'product',
        icon: 'shopping_bag',
      },
    ]);

    return { user, cards };
  },
});
</script>
