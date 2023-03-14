<template>
  <div className="clock-container">
    <h1 id="timer-label">{{ getCurrentTimer }}</h1>
    <span id="time-left">{{ convertToTime(getClockCount) }}</span>
    <div className="flex">
      <q-btn
        :icon="getIsPlaying ? 'pause' : 'play_arrow'"
        id="start_stop"
        @click="handlePlayPause"
      />
      <q-btn icon="restart_alt" id="reset" @click="handleReset" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useDoropomoStore } from 'src/stores/doropomoStore';
import { storeToRefs } from 'pinia';

const store = useDoropomoStore();

export default defineComponent({
  name: 'DoropomoProfileClock',
  setup() {
    const { getCurrentTimer, getClockCount, getIsPlaying } = storeToRefs(store);

    const handlePlayPause = () => store.playPause();
    const handleReset = () => store.handleReset();
    const convertToTime = (count: number) => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;

      let minutesString = minutes < 10 ? '0' + minutes : minutes;
      let secondsString = seconds < 10 ? '0' + seconds : seconds;

      return `${minutesString}:${secondsString}`;
    };

    return {
      getCurrentTimer,
      getClockCount,
      getIsPlaying,
      handlePlayPause,
      handleReset,
      convertToTime,
    };
  },
});
</script>
