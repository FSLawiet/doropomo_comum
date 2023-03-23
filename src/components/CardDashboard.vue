<template>
  <q-card class="my-card" bordered v-ripple:primary>
    <q-badge
      v-if="count > 0"
      :label="count"
      color="secondary"
      floating
      rounded
      transparent
    />
    <q-skeleton
      height="50px"
      v-if="load"
      animation="blink"
      class="bg-primary"
    />
    <q-card-section horizontal v-else>
      <div class="col flex flex-center text-h5">{{ label }}</div>

      <q-card-actions vertical class="justify-around q-px-md">
        <q-btn flat round color="primary" :icon="icon" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useApi } from 'src/composables/UseApi';
import { useAuthUser } from 'src/composables/UseAuthUser';

export default defineComponent({
  name: 'CardDashboard',
  props: {
    table: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: 'dataset',
    },
  },
  setup(props) {
    const count = ref(0);
    const load = ref(true);

    const { user } = useAuthUser();
    const { fetchCount } = useApi();

    onMounted(async () => {
      count.value = await fetchCount(props.table, user.value.id, 'exact');
      load.value = false;
    });

    return { count, load };
  },
});
</script>
