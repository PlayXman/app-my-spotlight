<template>
  <div v-if="temp > -Infinity">{{ temp }}<span>°C</span></div>
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

<style scoped>
div {
  font-size: 1.6rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

span {
  display: inline-block;
  font-size: 1rem;
  vertical-align: top;
  margin-top: 0.15em;
}
</style>
