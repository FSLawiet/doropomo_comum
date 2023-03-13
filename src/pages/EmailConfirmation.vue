<template>
  <q-page padding>
    <p class="text-body-1">Obrigado por regisrar!</p>
    <p class="text-body-1">
      Por favor, confirme o seu e-mail
      <strong>{{ $route.query.email }}</strong> para finalizar o seu cadastro
    </p>
    <div class="row justify-center">
      <div class="col-md-4 colsm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Voltar ao Login"
          color="dark"
          class="full-width"
          rounded
          size="lg"
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailConfirmationPage',
});
</script>
