<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Formulário de Categorias</p>
      </div>
      <q-form
        class="col-md-7 col-sm-12 col-xs-12 q-gutter-y-md"
        @submit.prevent="handleForm"
      >
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          outlined
          rounded
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Nome de categoria obrigatório.',
          ]"
        />
        <q-btn
          :label="isUpdate ? 'Alterar' : 'Salvar'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />
        <q-btn
          label="Voltar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'categorias' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApi } from 'src/composables/UseApi';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'FormCategory',
  setup() {
    const table = 'category';
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update } = useApi();

    const isUpdate = computed(() => route.params.id);

    let category = {};
    const form = ref({
      name: '',
    });

    const handleForm = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value);
          Notify.create({
            message: 'Categoria alterada com sucesso!',
            type: 'positive',
          });
        } else {
          await post(table, form.value);
          Notify.create({
            message: 'Categoria cadastrada com sucesso!',
            type: 'positive',
          });
        }
        router.push({ name: 'categorias' });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    const getCategoryById = async (id) => {
      try {
        category = await getById(table, id);
        form.value = category;
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        getCategoryById(isUpdate.value);
      }
    });

    return { form, isUpdate, getCategoryById, handleForm };
  },
});
</script>
