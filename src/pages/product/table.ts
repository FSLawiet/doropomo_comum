import { ref } from 'vue';

export const columnsProduct = [
  {
    name: 'img_url',
    align: 'left',
    label: 'Imagem',
    field: 'img_url',
    sortable: false,
  },
  {
    name: 'name',
    align: 'left',
    label: 'Nome',
    field: 'name',
    sortable: true,
  },
  {
    name: 'amount',
    align: 'left',
    label: 'Qtd.',
    field: 'amount',
    sortable: true,
  },
  {
    name: 'price',
    align: 'left',
    label: 'Preço Unitário',
    field: 'price',
    format: (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`,
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Ações',
    field: 'action',
    sortable: false,
  },
];

export const initialPagination = ref({
  page: 1,
  rowPerPage: 5,
});
