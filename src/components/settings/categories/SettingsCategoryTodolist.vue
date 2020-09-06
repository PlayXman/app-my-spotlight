<template>
  <SettingsSection title="Todo list" :onsubmit="handleSubmit">
    <SettingsInputText
      :id="id"
      type="text"
      label="Your personal api token"
      :value="value"
      :disabled="loading"
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
  computed: {
    id: function() {
      return "todolistApiKey";
    }
  },
  methods: {
    /**
     * @param {FormData} data
     */
    handleSubmit(data) {
      this.loading = true;
      const oldVal = this.value;
      this.value = data.get(this.id);
      TodolistSettings.handleApiKeyChange(this.value)
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
