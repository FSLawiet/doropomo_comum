<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSignUp">
      <p class="col-12 text-h5 text-center">Sign Up</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Nome" v-model="form.name" outlined rounded />
        <q-input
          label="E-mail"
          type="password"
          v-model="form.email"
          outlined
          rounded
        />
        <q-input label="Password" v-model="form.password" outlined rounded />
        <q-btn
          label="Cadastrar"
          color="primary"
          class="full-width"
          outline
          rounded
          size="lg"
          type="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'SignupPage',
  setup() {
    const { register } = useAuthUser();
    const router = useRouter();

    const form = ref({
      name: '',
      email: '',
      password: '',
    });

    const handleSignUp = async () => {
      try {
        await register(form.value);
        Notify.create({
          message: `Cadastro de ${form.value.name} realizado com sucesso!`,
          type: 'positive',
        });
        router.push({
          name: 'email-conirmation',
          query: { email: form.value.email },
        });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    return { form, handleSignUp };
  },
});
</script>
