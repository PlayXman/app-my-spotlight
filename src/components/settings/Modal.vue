<template>
  <Box class="modal" bg>
    <form v-on:submit="submit">
      <Field
        v-for="field in fields"
        :key="field.key"
        :type="field.type"
        :label="field.label"
        :id="field.key"
        v-model="field.value"
      />
      <button type="submit" class="button">Save</button>
      <span class="saved" v-if="saved">| success</span>
    </form>
  </Box>
</template>

<script>
import Field from "./Field";
import Settings from "../../models/Settings";
import Box from "../Box";

const settings = new Settings();

export default {
  name: "Modal",
  components: { Field, Box },
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

<style scoped>
.modal {
  position: absolute;
  left: 0;
  width: calc(100vw - 2 * var(--main-padding));
  max-width: 400px;
  bottom: 3.5rem;
  overflow: auto;
  z-index: 10;
}

.button {
  border: none;
  border-radius: 0.5rem;
  padding: 0.4em 0.8em;
  font-size: 1.2rem;
  font-family: inherit;
  color: white;
  background: var(--action-color);
  cursor: pointer;
}

.button:hover {
  background: var(--action-hover-color);
}

.saved {
  display: inline-block;
  color: var(--action-color);
  margin-left: 0.5rem;
}
</style>
