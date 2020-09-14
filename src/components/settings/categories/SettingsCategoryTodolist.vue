<template>
  <SettingsSection title="Todo list" :onsubmit="handleSubmit">
    <SettingsInputText
      :id="ids.apiKey"
      type="text"
      label="Your personal api token"
      :value="apiKey"
      :disabled="loading"
    />
    <SettingsSectionHint>
      Go to the
      <a href="https://todoist.com/app/" target="_blank" rel="noopener">
        Todoist app
      </a>
      and in Settings / Integrations there's "API token". Copy the value to the
      field above.
    </SettingsSectionHint>

    <SettingsInputText
      :id="ids.filters"
      type="text"
      label="Show items just from the following projects"
      placeholder="Inbox; Project A"
      :value="filters"
      :disabled="loading"
    />
    <SettingsSectionHint>
      You can specify which project items should appear. Fx. to filter only
      "Inbox" and "House reconstruction" type
      <code>Inbox; House reconstruction</code>.
    </SettingsSectionHint>
    <SettingsSectionHint>
      By default, <strong>all</strong> items are displayed.
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
      apiKey: "",
      filters: "",
      loading: true
    };
  },
  computed: {
    ids: function() {
      return {
        apiKey: "todolistApiKey",
        filters: "todolistFilter"
      };
    }
  },
  methods: {
    /**
     * @param {FormData} data
     */
    handleSubmit(data) {
      this.loading = true;
      const oldApiKey = this.apiKey;
      const oldFilters = this.filters;
      this.apiKey = data.get(this.ids.apiKey);
      this.filters = data.get(this.ids.filters);
      TodolistSettings.handleDataChange(this.apiKey, this.filters)
        .catch(() => {
          this.apiKey = oldApiKey;
          this.filters = oldFilters;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    TodolistSettings.getSettings()
      .then(data => {
        if (data) {
          this.apiKey = data.apiKey;
          this.filters = data.filters;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
