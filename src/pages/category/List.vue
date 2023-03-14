<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="isLoading"
      >
        <template v-slot:top>
          <span class="text-h6">Categorias</span>
          <q-space />
          <q-btn icon="add" color="primary">
            <q-tooltip>Inserir uma nova categoria</q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="edit" color="primary" dense size="sm">
              <q-tooltip>Editar Categoria {{ props.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" color="primary" dense size="sm">
              <q-tooltip>Excluir Categoria {{ props.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useApi } from 'src/composables/UseApi';
import { Notify } from 'quasar';

const columns = [
  {
    name: 'name',
    align: 'left',
    label: 'Nome',
    field: 'name',
    sortable: 'true',
  },
  { name: 'actions', align: 'right', label: 'Ações', field: 'action' },
];

export default defineComponent({
  name: 'CategoryList',
  setup() {
    const categories = ref([]);
    const isLoading = ref(true);
    const { list } = useApi();

    const handleListCategories = async () => {
      try {
        isLoading.value = true;
        categories.value = await list('category');
        isLoading.value = false;
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    onMounted(() => {
      handleListCategories();
    });

    return { columns, categories, isLoading };
  },
});
</script>
