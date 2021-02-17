<template>
  <SettingsInputBase>
    <label class="settingsInput__title" :for="id">
      {{ label }}
    </label>
    <div class="settingsInput__content">
      <input
        class="settingsInputText__input"
        :id="id"
        :name="id"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        v-on:keypress="handleKeypress"
        v-on:focusout="handleFocusout"
      />
    </div>
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
    placeholder: {
      type: String
    }
  },
  methods: {
    /**
     * @param {Event} e
     */
    handleFocusout: function(e) {
      e.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
    },
    /**
     * @param {Event} e
     */
    handleKeypress: function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
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
  border: none;
  border-radius: 0.5rem;
  padding: 0.75em 0.5em;
  font-size: inherit;
  font-family: monospace;
  color: var(--font-dark-color);
  background-color: #fff;
}

.settingsInputText__input::placeholder {
  color: #cacaca;
  font-style: italic;
  opacity: 1;
}

.settingsInputText__input:focus {
  outline: none;
}

.settingsInputText__input:disabled {
  cursor: progress;
}
</style>
