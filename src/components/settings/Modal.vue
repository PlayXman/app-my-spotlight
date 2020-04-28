<template>
  <div class="modal">
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
    </form>
  </div>
</template>

<script>
import Field from "./Field";
import Settings from "../../models/Settings";

const settings = new Settings();

export default {
  name: "Modal",
  components: { Field },
  data: () => ({
    fields: settings.getFields()
  }),
  methods: {
    /**
     * @param {Event} e
     */
    submit(e) {
      e.preventDefault();
      settings.saveFields(this.fields);
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
  background: rgba(255, 255, 255, 0.8);
  color: var(--font-dark-color);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 2rem;
}

.button {
  border: none;
  border-radius: var(--element-border-radius);
  padding: 0.4em 0.8em;
  font-size: 1.2rem;
  color: white;
  background: var(--action-color);
}

.button:hover {
  background: var(--action-hover-color);
}
</style>
