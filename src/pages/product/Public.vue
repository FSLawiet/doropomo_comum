<template>
  <q-page padding>
    <div class="row">
      <q-table
        grid
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :loading="isLoading"
        :filter="filter"
      >
        <template v-slot:top>
          <span class="text-h6">Produtos</span>
          <q-space />
          <q-input
            v-model="filter"
            outlined
            dense
            placeholder="Busca"
            class="q-mr-sm"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card class="product-card">
              <q-img
                :src="props.row.img_url"
                :ratio="4 / 3"
                placeholder-src="https://dummyimage.com/800x600/d10a0a/fff.png&text=Trabalhadores+do+mundo,+uni-vos!"
              >
                <template v-slot:error>
                  <div
                    class="absolute-full flex flex-center bg-negative text-white"
                  >
                    Cannot load image
                  </div>
                </template>
              </q-img>
              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle2">
                  {{
                    props.row.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useApi } from 'src/composables/UseApi';
import { Notify } from 'quasar';
import { columnsProduct } from './table';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ProductPublic',
  setup() {
    const products = ref([]);
    const isLoading = ref(true);
    const { list } = useApi();
    const route = useRoute();
    const filter = ref('');

    const handleListProducts = async (userId) => {
      try {
        isLoading.value = true;
        products.value = await list('product', userId);
        isLoading.value = false;
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    onMounted(() => {
      if (route.params.id) handleListProducts(route.params.id);
    });

    return {
      columnsProduct,
      products,
      isLoading,
      filter,
    };
  },
});
</script>
<style scoped>
.product-card {
  transition: ease-in-out 0.4s;
}
.product-card:hover {
  transform: scale(1.02);
}
</style>
