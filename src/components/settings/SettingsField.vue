<template>
  <div class="settingsField">
    <label
      class="settingsField__label"
      v-bind:for="id"
    >
      {{ label }}
    </label>
    <input
      class="settingsField__input"
      v-bind:id="id"
      v-bind:type="type"
      v-model="inputVal"
    />
  </div>
</template>

<script>
export default {
  name: "SettingsField",
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    value: String
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style>
.settingsField:not(:last-child) {
  margin-bottom: 1rem;
}

.settingsField__label {
  display: block;
  margin-bottom: 0.4em;
}

.settingsField__input {
  display: block;
  width: 100%;
  border: 1px solid var(--font-dark-color);
  border-radius: 0.5rem;
  padding: 0.5em;
  font-size: inherit;
}
</style>
