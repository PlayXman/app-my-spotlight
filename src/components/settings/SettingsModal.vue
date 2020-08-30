<template>
  <Box class="settingsModal" bg>
    <form v-on:submit="submit">
      <SettingsField
        v-for="field in fields"
        :key="field.key"
        :type="field.type"
        :label="field.label"
        :id="field.key"
        v-model="field.value"
      />
      <button type="submit" class="settingsModal__button">Save</button>
      <span class="settingsModal__saved" v-if="saved">| success</span>
    </form>
  </Box>
</template>

<script>
import SettingsField from "./SettingsField";
import Settings from "../../models/Settings";
import Box from "../Box";

const settings = new Settings();

export default {
  name: "SettingsModal",
  components: { SettingsField, Box },
  data: () => ({
    fields: settings.getFields(),
    saved: false
  }),
  methods: {
    /**
     * @param {Event} e
     */
    submit(e) {
      e.preventDefault();
      settings.saveFields(this.fields);
      this.saved = true;
    }
  }
};
</script>

<style>
.settingsModal {
  position: absolute;
  left: 0;
  width: calc(100vw - 2 * var(--main-padding));
  max-width: 400px;
  bottom: 3.5rem;
  overflow: auto;
  z-index: 10;
}

.settingsModal__button {
  border: none;
  border-radius: 0.5rem;
  padding: 0.4em 0.8em;
  font-size: 1.2rem;
  font-family: inherit;
  color: white;
  background: var(--action-color);
  cursor: pointer;
}

.settingsModal__button:hover {
  background: var(--action-hover-color);
}

.settingsModal__saved {
  display: inline-block;
  color: var(--action-color);
  margin-left: 0.5rem;
}
</style>
