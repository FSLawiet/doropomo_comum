<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="E-mail" v-model="form.email" outlined rounded />
        <q-input
          label="Password"
          type="password"
          v-model="form.password"
          outlined
          rounded
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            rounded
            size="sm"
            :to="{ name: 'signup' }"
          />
          <q-btn
            label="Esqueceu a senha?"
            color="primary"
            class="full-width"
            flat
            rounded
            size="sm"
            :to="{ name: 'reset-password' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthUser } from '../composables/UseAuthUser';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const { login } = useAuthUser();

    const form = ref({
      email: '',
      password: '',
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        Notify.create({
          message: 'Login realizado com sucesso!',
          type: 'positive',
        });
        router.push({ name: 'perfil' });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    return { form, handleLogin };
  },
});
</script>
