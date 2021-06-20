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
      and in Settings / Integrations there's an "API token". Copy the value to
      the field above.
    </SettingsSectionHint>

    <SettingsInputSelect
      :id="ids.filters"
      label="Show items just from the following projects"
      :disabled="loading"
      :options="projects"
      :values="activeProjects"
    />
    <SettingsSectionHint>
      You can specify from which projects the tasks should appear. Multiple
      projects can be selected at the same time.
    </SettingsSectionHint>
    <SettingsSectionHint>
      If left empty, the items from <strong>all</strong> projects are displayed.
    </SettingsSectionHint>
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SettingsSectionHint from "../section/SettingsSectionHint";
import SettingsInputText from "../inputs/SettingsInputText";
import SettingsInputSelect from "../inputs/SettingsInputSelect";
import TodolistSettings from "../../../models/settings/TodolistSettings";
import TodoList from "../../../models/todo/TodoList";

export default {
  name: "SettingsCategoryTodolist",
  components: {
    SettingsSection,
    SettingsSectionHint,
    SettingsInputText,
    SettingsInputSelect
  },
  data() {
    return {
      apiKey: "",
      activeProjects: [],
      projects: [],
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
      const oldFilters = this.activeProjects;
      this.apiKey = data.get(this.ids.apiKey);
      this.activeProjects = data.getAll(this.ids.filters);
      TodolistSettings.handleDataChange(this.apiKey, this.activeProjects)
        .catch(() => {
          this.apiKey = oldApiKey;
          this.activeProjects = oldFilters;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    const todolist = new TodoList();

    Promise.all([TodolistSettings.getSettings(), todolist.getProjects()])
      .then(([settings, projects]) => {
        if (settings) {
          this.apiKey = settings.apiKey;
          this.activeProjects = settings.filters;
        }
        if (projects) {
          this.projects = projects.map(project => {
            return project.name;
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
