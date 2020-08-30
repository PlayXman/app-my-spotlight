<template>
  <div v-if="temp > -Infinity" class="weather">{{ temp }}°<span class="weather__unit">C</span></div>
</template>

<script>
import Weather from "../models/Weather";

const weather = new Weather();

export default {
  name: "Weather",
  data: () => ({
    temp: weather.getLastWeather()
  }),
  mounted() {
    if (weather.isSet()) {
      weather.getTemperature().then(temp => {
        this.temp = temp;
      });
    }
  }
};
</script>

<style>
.weather {
  font-weight: 200;
  font-size: 2rem;
  padding: 0.5rem;
  text-shadow: var(--layout-items-shadow);
}

.weather__unit {
  display: inline-block;
  font-size: 0.5em;
  vertical-align: top;
  margin-top: 0.2em;
}
</style>
