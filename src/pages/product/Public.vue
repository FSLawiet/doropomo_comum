<template>
  <q-page padding>
    <div class="row">
      <q-select
        outlined
        v-model="categoryId"
        :options="optionsCategories"
        label="Categorias"
        class="col-12"
        dense
        option-label="name"
        option-value="id"
        map-options
        emit-value
        clearable
        @update:model-value="handleListProducts(route.params.id)"
      />
      <q-table
        grid
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :loading="isLoading"
        :filter="filter"
        v-model:pagination="initialPagination"
        hide-pagination
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
          <transition-group
            appear
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutRight"
          >
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3" key="card">
              <q-card
                class="product-card cursor-pointer"
                v-ripple:primary
                @click="handleShowDetails(props.row)"
              >
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
            <div
              class="col-12 q-pa-md"
              v-if="props.rowIndex === 3"
              key="parallax"
            >
              <q-parallax :height="200" :speed="0.5">
                <template v-slot:media>
                  <video width="720" height="440" autoplay loop muted>
                    <source type="video/webm" :src="parallaxWebm" />
                    <source type="video/mp4" :src="parallaxMp4" />
                  </video>
                </template>

                <h3 class="text-white">{{ config.name }}</h3>
              </q-parallax>
            </div>
          </transition-group>
        </template>
      </q-table>
    </div>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="initialPagination.page"
        :max="pagesNumber"
        direction-links
        @update:model-value="handleScrollToTop"
      />
    </div>
    <ProductDetails
      :show="showDetails"
      :product="productSelected"
      @hide-dialog="showDetails = false"
    />
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useApi } from 'src/composables/UseApi';
import ProductDetails from 'components/ProductDetails.vue';
import { Notify } from 'quasar';
import { columnsProduct, initialPagination } from './table';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ProductPublic',
  components: {
    ProductDetails,
  },
  setup() {
    const products = ref([]);
    const isLoading = ref(true);
    const { config, list } = useApi();
    const route = useRoute();
    const filter = ref('');
    const optionsCategories = ref([]);
    const categoryId = ref('');

    const parallaxWebm = ref('/videos/parallax.webm');
    const parallaxMp4 = ref('/videos/parallax.mp4');

    const handleListProducts = async (userId) => {
      try {
        isLoading.value = true;
        products.value = categoryId.value
          ? await list('product', userId, 'category_id', categoryId.value)
          : await list('product', userId);
        isLoading.value = false;
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    const showDetails = ref(false);

    const handleShowDetails = (product) => {
      productSelected.value = product;
      showDetails.value = true;
    };

    const handleListCategories = async (userId) => {
      optionsCategories.value = await list('category', userId);
    };

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const productSelected = ref({});

    onMounted(() => {
      if (route.params.id) {
        handleListProducts(route.params.id);
        handleListCategories(route.params.id);
      }
    });

    return {
      columnsProduct,
      initialPagination,
      categoryId,
      optionsCategories,
      handleListProducts,
      showDetails,
      handleShowDetails,
      handleScrollToTop,
      productSelected,
      products,
      isLoading,
      config,
      filter,
      route,
      pagesNumber: computed(() =>
        Math.ceil(products.value.length / initialPagination.value.rowsPerPage)
      ),
      parallaxWebm,
      parallaxMp4,
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
