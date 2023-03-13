<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRecoverPassword">
      <p class="col-12 text-h5 text-center">Recuperar Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="newPassword"
          type="password"
          outlined
          rounded
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Por favor, informe a sua nova senha.',
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Redefinir Senha"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'RecoverPassword',
  setup() {
    const { resetPassword } = useAuthUser();
    const router = useRouter();
    const newPassword = ref('');

    const handleRecoverPassword = async () => {
      try {
        await resetPassword(newPassword.value);
        Notify.create({
          message: 'Senha redefinida com sucesso!',
          type: 'positive',
        });
        router.replace({ name: 'perfil' });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    return { newPassword, handleRecoverPassword };
  },
});
</script>
