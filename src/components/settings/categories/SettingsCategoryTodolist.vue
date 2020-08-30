<template>
  <SettingsSection title="Todo list">
    <SettingsInputText
      id="todolistApiKey"
      type="text"
      label="Your personal api token"
      :value="value"
      :disabled="loading"
      :onchange="handleChange"
    />
    <SettingsSectionHint>
      Go to
      <a href="https://todoist.com/app/" target="_blank" rel="noopener">
        Todoist app
      </a>
      and in Settings / Integrations there's "<em>API token</em>". Copy the
      value to the field above.
    </SettingsSectionHint>
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SettingsSectionHint from "../section/SettingsSectionHint";
import SettingsInputText from "../inputs/SettingsInputText";
import TodolistSettings from "../../../models/settings/TodolistSettings";

export default {
  name: "SettingsCategoryTodolist",
  components: { SettingsSection, SettingsSectionHint, SettingsInputText },
  data() {
    return {
      value: "",
      loading: true
    };
  },
  methods: {
    /**
     * @param {string} val
     */
    handleChange(val) {
      this.loading = true;
      const oldVal = this.value;
      this.value = val;
      TodolistSettings.handleApiKeyChange(val)
        .catch(() => {
          this.value = oldVal;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    TodolistSettings.getApiKey()
      .then(key => {
        this.value = key;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
