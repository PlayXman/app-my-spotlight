<template>
  <SettingsInputBase>
    <div class="settingsInput__title">
      {{ label }}
    </div>
    <input
      class="settingsInputSwitch__input"
      type="checkbox"
      value="1"
      :id="id"
      :disabled="disabled"
      :checked="isChecked"
      v-on:change="handleChange"
    />
    <label class="settingsInputSwitch__label" :for="id">
      <i class="settingsInputSwitch__newInput"></i>
      {{ inputLabel }}
    </label>
  </SettingsInputBase>
</template>

<script>
import SettingsInputBase from "./SettingsInputBase";

export default {
  name: "SettingsInputSwitch",
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
    checked: {
      type: Boolean,
      default: false
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
  data() {
    return {
      isChecked: this.checked
    };
  },
  computed: {
    inputLabel: function() {
      return this.isChecked ? "On" : "Off";
    }
  },
  methods: {
    /**
     * @param {Event} e
     */
    handleChange(e) {
      this.isChecked = e.target.checked;
      this.onchange(this.isChecked);
    }
  }
};
</script>

<style>
.settingsInputSwitch__input {
  display: none;
}

.settingsInputSwitch__label {
  position: relative;
  padding-left: 3.75rem;
}

.settingsInputSwitch__newInput {
  position: absolute;
  display: block;
  width: 2.5em;
  height: 1.25em;
  background: #fff;
  border-radius: 999px;
  border: 1px solid var(--font-dark-color);
  top: -0.125em;
  left: 0;
}

.settingsInputSwitch__newInput:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 50%;
  background-color: var(--font-dark-color);
  width: 0.875em;
  height: 0.875em;
  transition: transform ease 300ms, background-color ease 300ms;
  transform: translateX(-0.625em);
}

.settingsInputSwitch__input:checked
  + label
  .settingsInputSwitch__newInput:before {
  transform: translateX(0.625em);
  background-color: var(--action-color);
}

.settingsInputSwitch__input:disabled + .settingsInputSwitch__label {
  cursor: progress;
}
</style>
