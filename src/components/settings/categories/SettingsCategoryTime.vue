<template>
  <SettingsSection title="Time" :onsubmit="handleSubmit">
    <SettingsInputSwitch
      :id="ids.timeOnOff"
      label="Turn on/off"
      :disabled="loading"
      :checked="isOn"
    />
    <SettingsInputSwitch
      v-if="isOn"
      :id="ids.timeHour24"
      label="Display 24 hour time"
      :disabled="loading"
      :checked="hour24"
    />
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SettingsInputSwitch from "../../settings/inputs/SettingsInputSwitch";
import TimeSettings from "../../../models/settings/TimeSettings";

export default {
  components: { SettingsInputSwitch, SettingsSection },
  data() {
    return {
      isOn: true,
      hour24: true,
      loading: true
    };
  },
  computed: {
    ids: function() {
      return {
        timeOnOff: "timeOnOff",
        timeHour24: "timeHour24"
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
      const oldHour24 = this.hour24;
      this.isOn = data.get(this.ids.timeOnOff) === "1";
      this.hour24 = data.get(this.ids.timeHour24) === "1";
      TimeSettings.handleDataChange(this.isOn, this.hour24)
        .catch(() => {
          this.isOn = oldIsOn;
          this.hour24 = oldHour24;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    TimeSettings.getSettings()
      .then(data => {
        if (data) {
          this.isOn = data.enabled;
          this.hour24 = data.hour24;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
