<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center">Recuperar Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          type="email"
          v-model="email"
          outlined
          rounded
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor, informe o seu email.',
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
          <q-btn
            label="Voltar"
            color="dark"
            class="full-width"
            rounded
            flat
            size="lg"
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import { Dialog, Notify } from 'quasar';

export default defineComponent({
  name: 'ResetPassword',
  setup() {
    const { sendPasswordResetEmail } = useAuthUser();
    const router = useRouter();
    const email = ref('');

    const handleResetPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        Dialog.create({
          title: 'Redefinição de Senha concluída com sucesso',
          message: `O link para a redefinição da senha for enviado para ${email.value}!`,
        })
          .onOk(() => {
            router.replace({ name: 'login' });
          })
          .onDismiss(() => {
            router.replace({ name: 'login' });
          });
      } catch (error) {
        let message = 'Erro desconhecido!';
        if (error instanceof Error) message = error.message;
        Notify.create({ message, type: 'negative' });
      }
    };

    return { email, handleResetPassword };
  },
});
</script>
