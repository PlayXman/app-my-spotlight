<template>
  <SettingsSection title="Background" :onsubmit="handleSubmit">
    <SettingsInputText
      :id="id"
      type="text"
      label="Keywords"
      placeholder="misty mountains"
      :value="searchKeys"
      :disabled="loading"
    />
    <SettingsSectionHint>
      The category from which the background pictures are downloaded can be
      changed. Just type one or more keywords into the field. If you don't know
      which keywords you should use, head to the
      <a href="https://unsplash.com/" target="_blank" rel="noopener"
        >Unsplash website</a
      >, and try their search. Then copy the keywords into the field above.
    </SettingsSectionHint>
    <SettingsSectionHint>
      By default, the "<strong>landscape</strong>" keyword is used. And if you
      want to reset back to default, just remove any text from the field.
    </SettingsSectionHint>
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SettingsSectionHint from "../section/SettingsSectionHint";
import SettingsInputText from "../inputs/SettingsInputText";
import BackgroundSettings from "../../../models/settings/BackgroundSettings";

export default {
  components: { SettingsSection, SettingsSectionHint, SettingsInputText },
  data() {
    return {
      searchKeys: "",
      loading: true
    };
  },
  computed: {
    id: function() {
      return "backgroundSearchKeys";
    }
  },
  methods: {
    /**
     * @param {FormData} data
     */
    handleSubmit(data) {
      this.loading = true;
      const oldVal = this.searchKeys;
      this.searchKeys = data.get(this.id);
      BackgroundSettings.handleChange(this.searchKeys)
        .catch(() => {
          this.searchKeys = oldVal;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    BackgroundSettings.getSearchKeys()
      .then(keys => {
        this.searchKeys = keys;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
