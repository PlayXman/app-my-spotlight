<template>
  <SettingsInputBase>
    <label class="settingsInput__title" :for="id">
      {{ label }}
    </label>
    <input
      class="settingsInputText__input"
      :id="id"
      :type="type"
      :disabled="disabled"
      :value="value"
      v-on:keypress="handleKeypress"
      v-on:focusout="handleFocusout"
    />
  </SettingsInputBase>
</template>

<script>
import SettingsInputBase from "./SettingsInputBase";

export default {
  name: "SettingsInputText",
  components: { SettingsInputBase },
  props: {
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onchange: {
      type: Function,
      required: true
    }
  },
  methods: {
    /**
     * @param {Event} e
     */
    handleFocusout: function(e) {
      this.onchange(e.target.value);
    },
    /**
     * @param {Event} e
     */
    handleKeypress: function(e) {
      if (e.key === "Enter") {
        e.target.blur();
      }
    }
  }
};
</script>

<style>
.settingsInputText__input {
  display: block;
  width: 100%;
  border: 1px solid var(--font-dark-color);
  border-radius: 0.5rem;
  padding: 0.5em;
  font-size: inherit;
  color: var(--font-dark-color);
  background-color: #fff;
}

.settingsInputText__input:focus {
  outline: none;
}

.settingsInputText__input:disabled {
  cursor: progress;
  border-color: var(--font-dark-color);
}
</style>
