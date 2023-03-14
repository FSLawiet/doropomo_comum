<template>
  <div className="timer-container">
    <p class="text-h6" :id="`${props.id}-label`">{{ props.title }}</p>
    <div id="timer">
      <div class="circle" style="--clr: #d10a0a">
        <div
          class="dots"
          :style="{
            transform: `rotateZ(
            ${getClockCount * 6}deg
          )`,
          }"
        ></div>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle
            cx="70"
            cy="70"
            r="70"
            :style="{
              'stroke-dashoffset': 440 - (440 - getClockCount) / 60,
            }"
          ></circle>
        </svg>
        <div id="actions" class="row">
          <q-btn
            round
            flat
            icon="remove"
            @click="handleDecrease"
            :id="`${props.id}-decrement`"
            style="z-index: 3000"
          />
          <span :id="`${props.id}-length`">
            {{
              props.id === 'rest'
                ? getRestCount
                : props.id === 'short'
                ? getShortCount
                : getLongCount
            }}
          </span>
          <q-btn
            round
            flat
            icon="add"
            @click="handleIncrease"
            :id="`${props.id}-increment`"
            style="z-index: 3000"
          />
        </div>
      </div>
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
    const { getRestCount, getShortCount, getLongCount, getClockCount } =
      storeToRefs(store);

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
      getClockCount,
      handleDecrease,
      handleIncrease,
    };
  },
});
</script>
<style scoped>
#timer {
  display: flex;
  gap: 24px;
}
#timer .circle {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#timer .circle svg {
  position: relative;
  width: 150px;
  height: 150px;
  transform: rotate(270deg);
}
#timer .circle svg circle {
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke-width: 8;
  stroke: #282828;
  transform: translate(5px, 5px);
}
#timer .circle svg circle:nth-child(2) {
  stroke: var(--clr);
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
}

#timer div {
  position: absolute;
  text-align: center;
  font-weight: 500;
  font-size: 1.5em;
}

#timer .dots {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
}
#timer .dots::before {
  content: '';
  position: absolute;
  top: -3px;
  width: 15px;
  height: 15px;
  background: var(--clr);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--clr), 0 0 30px var(--clr);
}
</style>
