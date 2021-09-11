<template>
  <SettingsInputBase>
    <label class="settingsInput__title" :for="id">
      {{ label }}
    </label>
    <div class="settingsInput__content">
      <v-select
        class="settingsInputSelect__input"
        :id="id"
        multiple
        :disabled="disabled"
        :options="options"
        v-on:input="handleFocusout"
        v-model="selectValues"
      />
      <input type="hidden" ref="hiddenInput" />
      <input
        type="hidden"
        :name="id"
        v-for="value in selectValues"
        :key="value"
        :value="value"
      />
    </div>
  </SettingsInputBase>
</template>

<script>
import SettingsInputBase from "./SettingsInputBase";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: { SettingsInputBase, vSelect },
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
    options: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    values: function(newVal) {
      this.selectValues = newVal;
    }
  },
  data() {
    return {
      selectValues: this.values
    };
  },
  methods: {
    handleFocusout: function() {
      setTimeout(() => {
        this.$refs.hiddenInput.form.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }, 100);
    }
  }
};
</script>

<style>
.settingsInputSelect__input {
  display: block;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  font-size: inherit;
  font-family: monospace;
  color: var(--font-dark-color);
  background-color: #fff;
}

.settingsInputSelect__input .vs__selected {
  border: none;
  background-color: var(--action-color);
  color: #fff;
}
.settingsInputSelect__input .vs__deselect {
  fill: rgba(255, 255, 255, 0.54);
  text-shadow: none;
}
.settingsInputSelect__input .vs__dropdown-menu,
.settingsInputSelect__input .vs__dropdown-toggle {
  border-radius: 0.5rem;
  border: none;
}
.settingsInputSelect__input .vs__dropdown-option--highlight {
  background-color: var(--action-color);
}
</style>
