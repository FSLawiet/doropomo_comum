<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Configurações</p>
      </div>
      <q-form
        class="col-md-7 col-sm-12 col-xs-12 q-gutter-y-md"
        @submit.prevent="handleForm"
      >
        <q-input
          label="Nome da Loja"
          v-model="form.name"
          lazy-rules
          outlined
          rounded
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Nome de categoria obrigatório.',
          ]"
        />

        <q-input
          label="Telefone"
          v-model="form.phone"
          lazy-rules
          outlined
          rounded
          mask="+## (##) #####-####"
          unmasked-value
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Nome de categoria obrigatório.',
          ]"
        />

        <div class="row justify-center q-gutter-md q-pa-md">
          <q-color
            v-model="form.primary"
            class="col-md-4 col-sm-12 col-xs-12"
          />
          <q-color
            v-model="form.secondary"
            class="col-md-4 col-sm-12 col-xs-12"
          />
        </div>

        <q-btn
          label="Salvar"
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
          :to="{ name: 'perfil' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from 'src/composables/UseApi';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { useTheme } from 'src/composables/UseTheme';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'FormConfig',
  setup() {
    const table = 'config';
    const router = useRouter();
    const { post, list, update } = useApi();
    const { user } = useAuthUser();
    const { setTheme } = useTheme();

    let config = {};
    const form = ref({
      name: '',
      phone: '',
      primary: '',
      secondary: '',
    });

    const handleForm = async () => {
      try {
        if (form.value.id) {
          await update(table, form.value);
        } else {
          await post(table, form.value);
        }
        setTheme(form.value.primary, form.value.secondary);
        Notify.create({
          message: 'Loja configurada com sucesso!',
          type: 'positive',
        });
        router.push({ name: 'perfil' });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    const handleGetConfig = async () => {
      try {
        config = await list(table, user.value.id);
        form.value = config[0];
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    onMounted(() => {
      handleGetConfig();
    });

    return { form, handleGetConfig, handleForm };
  },
});
</script>
