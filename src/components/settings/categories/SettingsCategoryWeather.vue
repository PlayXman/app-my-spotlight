<template>
  <SettingsSection title="Weather" :onsubmit="handleSubmit">
    <SettingsInputSwitch
      :id="ids.weatherOnOff"
      label="Turn on/off"
      :disabled="loading"
      :checked="isOn"
    />
    <SettingsInputChoice
      v-if="isOn"
      :id="ids.weatherUnit"
      label="Temperature unit"
      :disabled="loading"
      :options="unitOptions"
      default="c"
      :value="unit"
    />
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SettingsInputSwitch from "../../settings/inputs/SettingsInputSwitch";
import SettingsInputChoice from "../../settings/inputs/SettingsInputChoice";
import WeatherSettings from "../../../models/settings/WeatherSettings";

export default {
  components: { SettingsInputChoice, SettingsInputSwitch, SettingsSection },
  data() {
    return {
      isOn: false,
      unit: "",
      loading: true
    };
  },
  computed: {
    unitOptions: function() {
      return {
        c: "Celsius",
        f: "Fahrenheit"
      };
    },
    ids: function() {
      return {
        weatherOnOff: "weatherOnOff",
        weatherUnit: "weatherUnit"
      };
    }
  },
  methods: {
    /**
     * @param {FormData} data
     */
    handleSubmit(data) {
      this.loading = true;
      const oldIsOn = this.isOn;
      const oldUnit = this.unit;
      this.isOn = data.get(this.ids.weatherOnOff) === "1";
      this.unit = data.get(this.ids.weatherUnit) || "c";
      WeatherSettings.handleDataChange(this.isOn, this.unit)
        .catch(() => {
          this.isOn = oldIsOn;
          this.unit = oldUnit;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    WeatherSettings.getSettings()
      .then(data => {
        if (data) {
          this.isOn = data.enabled;
          this.unit = data.unit;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
