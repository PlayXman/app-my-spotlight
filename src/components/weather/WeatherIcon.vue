<template>
  <ClearSkyWeatherIcon v-if="cleanedCode === '01'" class="weatherIcon" />
  <FewCloudsWeatherIcon v-else-if="cleanedCode === '02'" class="weatherIcon" />
  <ScatteredCloudsWeatherIcon
    v-else-if="cleanedCode === '03'"
    class="weatherIcon"
  />
  <BrokenCloudsWeatherIcon
    v-else-if="cleanedCode === '04'"
    class="weatherIcon"
  />
  <ShowerRainWeatherIcon v-else-if="cleanedCode === '09'" class="weatherIcon" />
  <RainWeatherIcon v-else-if="cleanedCode === '10'" class="weatherIcon" />
  <ThunderstormWeatherIcon
    v-else-if="cleanedCode === '11'"
    class="weatherIcon"
  />
  <SnowWeatherIcon v-else-if="cleanedCode === '13'" class="weatherIcon" />
  <MistWeatherIcon v-else-if="cleanedCode === '50'" class="weatherIcon" />
</template>

<script>
import ThunderstormWeatherIcon from "../icons/ThunderstormWeatherIcon";
import BrokenCloudsWeatherIcon from "../icons/BrokenCloudsWeatherIcon";
import ClearSkyWeatherIcon from "../icons/ClearSkyWeatherIcon";
import FewCloudsWeatherIcon from "../icons/FewCloudsWeatherIcon";
import MistWeatherIcon from "../icons/MistWeatherIcon";
import RainWeatherIcon from "../icons/RainWeatherIcon";
import ScatteredCloudsWeatherIcon from "../icons/ScatteredCloudsWeatherIcon";
import ShowerRainWeatherIcon from "../icons/ShowerRainWeatherIcon";
import SnowWeatherIcon from "../icons/SnowWeatherIcon";

export default {
  components: {
    SnowWeatherIcon,
    ShowerRainWeatherIcon,
    ScatteredCloudsWeatherIcon,
    RainWeatherIcon,
    MistWeatherIcon,
    FewCloudsWeatherIcon,
    ClearSkyWeatherIcon,
    BrokenCloudsWeatherIcon,
    ThunderstormWeatherIcon
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    cleanedCode() {
      return this.code.slice(0, -1);
    }
  }
};
</script>

<style>
.weatherIcon {
  width: auto;
  margin: 0 auto;
}
</style>
