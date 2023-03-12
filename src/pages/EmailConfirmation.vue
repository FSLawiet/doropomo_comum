<template>
  <q-page padding>
    <p class="text-body-1">Obrigado por regisrar!</p>
    <p class="text-body-1">
      Por favor, confirme o seu e-mail
      <strong>{{ $route.query.email }}</strong> para finalizar o seu cadastro
    </p>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailConfirmationPage',
});
</script>
