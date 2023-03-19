<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :loading="isLoading"
      >
        <template v-slot:top>
          <span class="text-h6">Produtos</span>
          <q-btn
            label="Loja"
            dense
            size="sm"
            outline
            class="q-ml-sm"
            icon="store"
            color="primary"
            @click="handleGoToStore"
          />
          <q-btn
            label="Copiar"
            dense
            size="sm"
            outline
            class="q-ml-sm"
            icon="content_copy"
            color="primary"
            @click="handleCopyClipboard"
          />
          <q-space />
          <q-btn
            v-if="isDesktop"
            icon="add"
            color="primary"
            :to="{ name: 'produtos_form' }"
          >
            <q-tooltip>Inserir um novo produto</q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" :alt="props.row.name" />
            </q-avatar>
            <q-avatar v-else color="primary" icon="no_photography" />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="edit"
              color="primary"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip>Editar Produto {{ props.row.name }}</q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="primary"
              dense
              size="sm"
              @click="handleDelete(props.row)"
            >
              <q-tooltip>Excluir Produto {{ props.row.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky v-if="isMobile" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" :to="{ name: 'produtos_form' }" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useApi } from 'src/composables/UseApi';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { Dialog, Notify, Platform, copyToClipboard, openURL } from 'quasar';
import { useRouter } from 'vue-router';
import { columnsProduct } from './table';

export default defineComponent({
  name: 'ProductList',
  setup() {
    const products = ref([]);
    const isLoading = ref(true);
    const { list, remove } = useApi();
    const { user } = useAuthUser();
    const router = useRouter();

    const isMobile = ref(Platform.is.mobile);
    const isDesktop = ref(Platform.is.desktop);

    const handleListProducts = async () => {
      try {
        isLoading.value = true;
        products.value = await list('product', user.value.id);
        isLoading.value = false;
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    const handleEdit = (product) => {
      router.push({ name: 'produtos_form', params: { id: product.id } });
    };

    const handleDelete = async (product) => {
      Dialog.create({
        title: 'Exclusão de produto',
        message: `Tem certeza de que deseja excluir o produto ${product.name}?`,
        ok: {
          flat: true,
          color: 'primary',
        },
        cancel: {
          flat: true,
          color: 'primary',
        },
        persistent: true,
      }).onOk(async () => {
        try {
          await remove('product', product.id);
          Notify.create({
            message: 'Produto excluído com sucesso!',
            type: 'positive',
          });
          handleListProducts();
        } catch (error) {
          let message = 'Erro desconhecido!';
          if (error instanceof Error) message = error.message;
          Notify.create({ message, type: 'negative' });
        }
      });
    };

    const handleGoToStore = () => {
      const IdUser = user.value.id;
      const link = router.resolve({
        name: 'product_public',
        params: { id: IdUser },
      });
      openURL(window.origin + link.href);
    };

    const handleCopyClipboard = () => {
      const IdUser = user.value.id;
      const link = router.resolve({
        name: 'product_public',
        params: { id: IdUser },
      });
      const externalLink = window.origin + link.href;
      copyToClipboard(externalLink)
        .then(() => {
          Notify.create({ message: 'Link Copiado', type: 'info' });
        })
        .catch((error) => {
          let message = 'Erro desconhecido!';
          if (error instanceof Error) message = error.message;
          Notify.create({ message, type: 'negative' });
        });
    };

    onMounted(() => {
      handleListProducts();
    });

    return {
      columnsProduct,
      products,
      isLoading,
      handleEdit,
      handleDelete,
      handleGoToStore,
      handleCopyClipboard,
      isMobile,
      isDesktop,
    };
  },
});
</script>
