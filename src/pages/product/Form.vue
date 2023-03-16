<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Formulário de Produtos</p>
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
            (val) => (val && val.length > 0) || 'Nome de produto obrigatório.',
          ]"
        />
        <q-editor v-model="form.description" min-height="5rem" />
        <q-input
          label="Quantidade"
          v-model.number="form.amount"
          type="number"
          lazy-rules
          outlined
          rounded
          :rules="[
            (val) => (val && val >= 0) || 'Quantidade de produtos obrigatória.',
          ]"
        />
        <q-field
          label="Preço Unitário"
          v-model="form.price"
          lazy-rules
          outlined
          rounded
        >
          <template
            v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
          >
            <input
              :id="id"
              class="q-field__input text-right"
              :value="modelValue"
              @change="(e) => emitValue(e.target.value)"
              v-money="moneyFormatForDirective"
              v-show="floatingLabel"
            />
          </template>
        </q-field>
        <q-select
          v-model="form.category_id"
          :options="optionsCategory"
          label="Categorias"
          outlined
          rounded
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[(val) => !!val || 'Categoria de produto obrigatória.']"
        ></q-select>
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
          :to="{ name: 'produtos' }"
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
import { VMoney } from 'v-money';

const moneyFormatForDirective = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false,
};

export default defineComponent({
  name: 'FormProduct',
  directives: { money: VMoney },
  setup() {
    const table = 'product';
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update, list } = useApi();

    const isUpdate = computed(() => route.params.id);

    let product = {};
    const optionsCategory = ref([]);
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: '0',
    });

    const converteMoedaFloat = (valor) => {
      let preco = 0;
      if (valor !== '') {
        valor = valor.split(' ')[1];
        valor = valor.replace('.', '');
        valor = valor.replace(',', '.');
        preco = parseFloat(valor);
      }
      return preco;
    };

    const listCategories = async () => {
      optionsCategory.value = await list('category');
    };

    const handleForm = async () => {
      try {
        if (isUpdate.value) {
          await update(table, {
            ...form.value,
            price: converteMoedaFloat(form.value.price),
          });
          Notify.create({
            message: 'Categoria alterada com sucesso!',
            type: 'positive',
          });
        } else {
          await post(table, {
            ...form.value,
            price: converteMoedaFloat(form.value.price),
          });
          Notify.create({
            message: 'Categoria cadastrada com sucesso!',
            type: 'positive',
          });
        }
        router.push({ name: 'produtos' });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    const getProductById = async (id) => {
      try {
        product = await getById(table, id);
        form.value = product;
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    onMounted(() => {
      listCategories();
      if (isUpdate.value) {
        getProductById(isUpdate.value);
      }
    });

    return {
      form,
      optionsCategory,
      isUpdate,
      getProductById,
      handleForm,
      moneyFormatForDirective,
    };
  },
});
</script>
