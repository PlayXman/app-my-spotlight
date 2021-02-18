<template>
  <Box v-if="temp > -Infinity" class="weather">
    {{ temp }}°<span class="weather__unit">{{ unit }}</span>
  </Box>
</template>

<script>
import Weather from "../models/Weather";
import WeatherSettings from "../models/settings/WeatherSettings";
import Box from "./Box";

const weather = new Weather();

export default {
  name: "Weather",
  components: { Box },
  data() {
    return {
      temp: -Infinity,
      unit: "C"
    };
  },
  methods: {
    init() {
      weather.isEnabled().then(enabled => {
        if (enabled) {
          weather.getTemperature().then(temp => {
            this.temp = temp.temp;
            this.unit = temp.unit;
          });
        } else {
          this.temp = -Infinity;
        }
      });
    }
  },
  mounted() {
    this.init();
    WeatherSettings.observeUpdate(this.init);
  },
  destroyed() {
    WeatherSettings.removeObserver(this.init);
  }
};
</script>

<style>
.weather {
  font-weight: 200;
  font-size: 2rem;
  line-height: 1;
  padding: 0.5rem 0.75rem;
  text-shadow: var(--layout-items-shadow);
}

.weather__unit {
  display: inline-block;
  font-size: 0.5em;
  vertical-align: top;
  margin-top: 0.2em;
}
</style>
