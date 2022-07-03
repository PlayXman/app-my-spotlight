<template>
  <Box v-if="enabled" class="weather" v-on:click="handleClick">
    <div class="weather__currentWeather">
      <div class="weather__temperature">
        {{ current.temperature }}°<span class="weather__temperatureUnit">{{
          temperatureUnit
        }}</span>
      </div>
      <div class="weather__hidden weather__currentDetails">
        <div class="weather__currentWeatherIcon" :title="current.weather">
          <WeatherIcon :code="current.weatherIcon" />
        </div>
        <div>
          <div title="Humidity">
            <HumidityWeatherIcon class="weather__currentDetailsIcon" />
            {{ current.humidity }}%
          </div>
          <div title="UV index">
            <UvWeatherIcon class="weather__currentDetailsIcon" />
            {{ current.uvi }}
          </div>
        </div>
      </div>
    </div>
    <div class="weather__hidden weather__hourly">
      <div v-for="hour in hourly" :key="hour.key" class="weather__hourlyItem">
        <div class="weather__hourlyTime">{{ hour.time }}</div>
        <div class="weather__hourlyIcon" :title="hour.weather">
          <WeatherIcon :code="hour.weatherIcon" />
        </div>
        <div class="weather__temperature">
          {{ hour.temperature }}°<span class="weather__temperatureUnit">{{
            temperatureUnit
          }}</span>
        </div>
        <div class="weather__hourlyDetails">
          <div title="Probability of precipitation">
            {{ hour.precipitation }}%
          </div>
          <div title="UV index">{{ hour.uvi }}</div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script>
import Weather from "../../models/weather/Weather";
import WeatherSettings from "../../models/settings/WeatherSettings";
import Box from "../Box";
import WeatherIcon from "./WeatherIcon";
import UvWeatherIcon from "../icons/UvWeatherIcon";
import HumidityWeatherIcon from "../icons/HumidityWeatherIcon";
import { roundTo } from "../../models/utils";

const weather = new Weather();

export default {
  components: { HumidityWeatherIcon, UvWeatherIcon, WeatherIcon, Box },
  data() {
    return {
      enabled: false,
      temperatureUnit: "",
      current: {
        temperature: 0,
        humidity: 0,
        uvi: 0,
        weather: "",
        weatherIcon: ""
      },
      hourly: [],
      href: ""
    };
  },
  methods: {
    /**
     * Initializes and updates the weather info.
     */
    init() {
      weather.isEnabled().then(enabled => {
        if (enabled) {
          weather.getForecast().then(forecast => {
            if (forecast.isCurrent) {
              this.temperatureUnit = forecast.current.temperatureUnit.toUpperCase();

              // Current weather
              this.current.temperature = forecast.current.temperature;
              this.current.humidity = roundTo(forecast.current.humidity);
              this.current.uvi = roundTo(forecast.current.uvi);
              this.current.weather = forecast.current.weather;
              this.current.weatherIcon = forecast.current.weatherIcon;

              // Hourly weather
              this.hourly = [];
              for (const hour of forecast.hourly) {
                this.hourly.push({
                  temperature: hour.temperature,
                  precipitation: roundTo(hour.precipitation * 100),
                  uvi: roundTo(hour.uvi),
                  weather: hour.weather,
                  weatherIcon: hour.weatherIcon,
                  time: hour.date?.toLocaleString("en-US", {
                    timeStyle: "short",
                    hour12: false
                  })
                });
              }

              // Website URL
              this.href = weather.getWebsiteUrl(
                forecast.location.lat,
                forecast.location.lon
              );

              this.enabled = true;
            }
          });
        } else {
          this.enabled = false;
        }
      });
    },
    /**
     * Opens the weather website.
     */
    handleClick() {
      window.location.href = this.href;
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
  padding: 0.5rem 0.75rem;
  text-shadow: var(--layout-items-shadow);
  cursor: pointer;
}

.weather__temperature {
  font-weight: 200;
  font-size: 2rem;
  line-height: 1;
}

.weather__temperatureUnit {
  display: inline-block;
  font-size: 0.5em;
  vertical-align: top;
  margin-top: 0.2em;
}

.weather__hidden {
  transition-property: max-width, max-height, margin, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  transition-delay: 0ms, 0ms, 0ms, 100ms;
  overflow: hidden;
  opacity: 1;
}
.weather:not(:hover) .weather__hidden {
  max-width: 0;
  max-height: 0;
  margin: 0;
  opacity: 0;
  transition-delay: 100ms, 100ms, 100ms, 0ms;
}

.weather__currentWeather {
  display: flex;
  justify-content: space-between;
}

.weather__currentDetails {
  display: flex;
  max-width: 9rem;
  max-height: 2.5rem;
}

.weather__currentWeatherIcon {
  margin-right: 1rem;
}

.weather__currentDetailsIcon {
  width: auto;
  display: inline-block;
  vertical-align: middle;
  color: var(--font-medium-color);
}

.weather__hourly {
  display: flex;
  margin-top: 2rem;
  max-width: 14rem;
  max-height: 9rem;
}

.weather__hourlyItem {
  margin-right: 1.5rem;
  line-height: 1;
  min-width: 3rem;
  text-align: center;
}
.weather__hourlyItem:last-child {
  margin-right: 0;
}

.weather__hourlyTime {
  color: var(--font-medium-color);
}

.weather__hourlyIcon {
  margin: 0.5rem 0;
}

.weather__hourlyDetails {
  display: flex;
  justify-content: space-between;
}
.weather__hourlyDetails > :first-child {
  margin-right: 0.5rem;
}
</style>
