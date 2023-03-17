<template>
  <q-dialog
    :model-value="show"
    @before-hide="handleClose"
    :full-width="isMobile"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Detalhes</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-img
          :src="product.img_url"
          :ratio="4 / 3"
          placeholder-src="https://dummyimage.com/800x600/d10a0a/fff.png&text=Trabalhadores+do+mundo,+uni-vos!"
          style="min-width: 300px"
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-h6">{{ product.name }}</div>
        <div class="text-subtitle2">
          {{
            product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          }}
        </div>
        <div class="text-body2" v-html="product.description" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn label="Cancelar" outline color="primary" v-close-popup />
        <q-btn
          icon="send"
          label="Fazer Pedido"
          color="primary"
          @click="handleSend"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { openURL, Platform } from 'quasar';

export default defineComponent({
  name: 'ProductDetails',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    product: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const isMobile = ref(Platform.is.mobile);

    const handleClose = () => {
      emit('hideDialog');
    };

    const handleSend = () => {
      const phone = '5562981380914';
      const msg = `Envio de ${props.product.name}`;

      const link = encodeURI(
        `https://api.whatsapp.com/send?phone=${phone}&text=${msg}`
      );
      openURL(link);
    };

    return { isMobile, handleClose, handleSend };
  },
});
</script>
