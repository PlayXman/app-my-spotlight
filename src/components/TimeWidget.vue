<template>
  <div v-if="!loading && enabled" class="time">
    {{ time
    }}<span v-if="!is24Hour" class="time__dayPeriod">{{ dayPeriod }}</span>
  </div>
</template>

<script>
import TimeSettings from "../models/settings/TimeSettings";

/**
 * @param {boolean} hour12 Format 12 or 24 hour time
 * @returns {{time: string, dayPeriod: (string)}}
 */
function createTime(hour12 = false) {
  const d = new Date();

  let time = d.toLocaleTimeString("en-US", {
    hour12: hour12,
    hour: "numeric",
    minute: "2-digit"
  });
  if (hour12) {
    time = time.split(" ")[0];
  }

  return {
    time: time,
    dayPeriod: d.getHours() < 12 ? "am" : "pm"
  };
}

export default {
  data() {
    return {
      listener: null,
      enabled: false,
      time: "",
      is24Hour: true,
      dayPeriod: "",
      loading: true
    };
  },
  methods: {
    stopTimer() {
      if (this.listener) {
        clearInterval(this.listener);
      }
    },
    updateTime() {
      const currentTime = createTime(!this.is24Hour);
      this.time = currentTime.time;
      this.dayPeriod = currentTime.dayPeriod;
    },
    init() {
      TimeSettings.getSettings()
        .then(data => {
          if (data) {
            this.enabled = data.enabled;
            this.is24Hour = data.hour24;

            if (this.enabled) {
              this.updateTime();

              this.listener = setInterval(() => {
                this.updateTime();
              }, 1000);
            } else {
              this.stopTimer();
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.init();
    TimeSettings.observeUpdate(this.init);
  },
  destroyed() {
    TimeSettings.removeObserver(this.init);
    this.stopTimer();
  }
};
</script>

<style>
.time {
  font-size: 5.5rem;
  font-weight: 100;
  line-height: 1;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.35), 0 2px 2px rgba(0, 0, 0, 0.25);
}

.time__dayPeriod {
  font-size: 0.5em;
}

@media (min-width: 32em) {
  .time {
    font-size: 9rem;
  }
}
</style>
