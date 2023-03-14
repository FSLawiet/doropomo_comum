import { defineStore } from 'pinia';

export const useDoropomoStore = defineStore('doropomo', {
  state: () => ({
    restCount: 25,
    shortCount: 5,
    longCount: 15,
    clockCount: 25 * 60,
    currentTimer: 'Rest',
    isPlaying: false,
    loop: undefined as any,
  }),
  getters: {
    getRestCount: (state) => state.restCount,
    getShortCount: (state) => state.shortCount,
    getLongCount: (state) => state.longCount,
    getClockCount: (state) => state.clockCount,
    getCurrentTimer: (state) => state.currentTimer,
    getIsPlaying: (state) => state.isPlaying,
  },
  actions: {
    resetTimer() {
      clearInterval(this.loop);
    },
    playPause() {
      if (this.isPlaying) {
        clearInterval(this.loop);
        this.isPlaying = false;
      } else {
        this.loop = setInterval(() => {
          if (this.clockCount === 0) {
            this.currentTimer =
              this.currentTimer === 'Rest'
                ? 'Short Work'
                : this.currentTimer === 'Short Work'
                ? 'Long Work'
                : 'Rest';
            this.clockCount =
              this.currentTimer === 'Rest'
                ? this.shortCount * 60
                : this.currentTimer === 'Short Work'
                ? this.longCount * 60
                : this.restCount * 60;
          } else {
            this.clockCount = this.clockCount - 1;
          }
        }, 1000);
        this.isPlaying = true;
      }
    },
    handleReset() {
      this.restCount = 25;
      this.shortCount = 5;
      this.longCount = 15;
      this.clockCount = 25 * 60;
      this.currentTimer = 'Rest';
      this.isPlaying = false;

      clearInterval(this.loop);
    },
    handleRestIncrease() {
      if (this.restCount < 60) {
        const newCount = this.restCount + 1;
        this.restCount = newCount;
        if (this.currentTimer === 'Rest' && !this.isPlaying)
          this.clockCount = newCount * 60;
      }
    },
    handleRestDecrease() {
      if (this.restCount > 1) {
        const newCount = this.restCount - 1;
        this.restCount = newCount;
        if (this.currentTimer === 'Rest' && !this.isPlaying)
          this.clockCount = newCount * 60;
      }
    },
    handleShortIncrease() {
      if (this.shortCount < 60) {
        const newCount = this.shortCount + 1;
        this.shortCount = newCount;
        if (this.currentTimer === 'Short Work' && !this.isPlaying)
          this.clockCount = newCount * 60;
      }
    },
    handleShortDecrease() {
      if (this.shortCount > 1) {
        const newCount = this.shortCount - 1;
        this.shortCount = newCount;
        if (this.currentTimer === 'Short Work' && !this.isPlaying)
          this.clockCount = newCount * 60;
      }
    },
    handleLongIncrease() {
      if (this.longCount < 60) {
        const newCount = this.longCount + 1;
        this.longCount = newCount;
        if (this.currentTimer === 'Long Work' && !this.isPlaying)
          this.clockCount = newCount * 60;
      }
    },
    handleLongDecrease() {
      if (this.longCount > 1) {
        const newCount = this.longCount - 1;
        this.longCount = newCount;
        if (this.currentTimer === 'Long Work' && !this.isPlaying)
          this.clockCount = newCount * 60;
      }
    },
  },
});
