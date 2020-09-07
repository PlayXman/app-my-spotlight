<template>
  <SettingsInputBase class="settingsInputChoice">
    <div class="settingsInput__title">
      {{ label }}
    </div>
    <div class="settingsInput__content">
      <div
        class="settingsInputChoice__choice"
        v-for="choice in choices"
        :key="choice.id"
      >
        <input
          class="settingsInputChoice__input"
          type="radio"
          :id="choice.id"
          :name="id"
          :value="choice.value"
          :disabled="disabled"
          :checked="isChecked(choice.value)"
          v-on:change="handleChange"
        />
        <label class="settingsInputChoice__label" :for="choice.id">
          <i class="settingsInputChoice__newInput"></i>
          {{ choice.label }}
        </label>
      </div>
    </div>
  </SettingsInputBase>
</template>

<script>
import SettingsInputBase from "./SettingsInputBase";

export default {
  name: "SettingsInputChoice",
  components: { SettingsInputBase },
  props: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: ""
    },
    default: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    choices: function() {
      return Object.keys(this.options).map(key => {
        return {
          id: `${this.id}_${key}`,
          value: key,
          label: this.options[key]
        };
      });
    }
  },
  methods: {
    /**
     * @param {string} val
     * @returns {boolean}
     */
    isChecked(val) {
      if (!this.value.length) {
        return val === this.default;
      }

      return val === this.value;
    },
    /**
     * @param {Event} e
     */
    handleChange(e) {
      e.target.form.dispatchEvent(new Event("submit"));
    }
  }
};
</script>

<style>
.settingsInputChoice {
  align-items: flex-start;
}

.settingsInputChoice__choice:not(:last-child) {
  margin-bottom: 0.5rem;
}

.settingsInputChoice__input {
  display: none;
}

.settingsInputChoice__label {
  position: relative;
  padding-left: 2.5rem;
}

.settingsInputChoice__newInput {
  position: absolute;
  display: block;
  width: 1.25em;
  height: 1.25em;
  background: #fff;
  border-radius: 50%;
  border: 1px solid var(--font-dark-color);
  top: -0.125em;
  left: 0;
}

.settingsInputChoice__newInput:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 50%;
  background: var(--action-color);
  width: 0.875em;
  height: 0.875em;
  transition: transform ease 300ms;
  transform: scale(0);
}

.settingsInputChoice__input:checked
  + label
  .settingsInputChoice__newInput:before {
  transform: scale(1);
}

.settingsInputChoice__input:disabled + .settingsInputChoice__label {
  cursor: progress;
}
</style>
