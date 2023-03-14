<template>
  <div className="timer-container">
    <h2 :id="`${props.id}-label`">{{ props.title }}</h2>
    <div className="flex actions-wrapper">
      <q-btn
        icon="remove"
        @click="handleDecrease"
        :id="`${props.id}-decrement`"
      />
      <span :id="`${props.id}-length`">{{
        props.id === 'rest'
          ? getRestCount
          : props.id === 'short'
          ? getShortCount
          : getLongCount
      }}</span>
      <q-btn icon="add" @click="handleIncrease" :id="`${props.id}-increment`" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useDoropomoStore } from 'src/stores/doropomoStore';
import { storeToRefs } from 'pinia';

const store = useDoropomoStore();

export default defineComponent({
  name: 'DoropomoTimer',
  props: {
    id: String,
    title: String,
  },
  setup(props) {
    const { getRestCount, getShortCount, getLongCount } = storeToRefs(store);

    const handleDecrease = () => {
      switch (props.id) {
        case 'rest':
          store.handleRestDecrease();
          break;
        case 'short':
          store.handleShortDecrease();
          break;
        case 'long':
          store.handleLongDecrease();
          break;
      }
    };

    const handleIncrease = () => {
      switch (props.id) {
        case 'rest':
          store.handleRestIncrease();
          break;
        case 'short':
          store.handleShortIncrease();
          break;
        case 'long':
          store.handleLongIncrease();
          break;
      }
    };
    return {
      props,
      getRestCount,
      getShortCount,
      getLongCount,
      handleDecrease,
      handleIncrease,
    };
  },
});
</script>
