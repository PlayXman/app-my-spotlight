<template>
  <div class="settingsModal__wrapper">
    <Box class="settingsModal" bg>
      <h2 class="settingsModal__title">Settings</h2>
      <div>
        <SettingsCategoryWeather />
        <SettingsCategoryTodolist />
      </div>
    </Box>
    <LayoutButton class="settingsModal__close" :on-click="handleClose">
      <CloseIcon />
    </LayoutButton>
  </div>
</template>

<script>
import Box from "../Box";
import LayoutButton from "../LayoutButton";
import CloseIcon from "../icons/CloseIcon";
import SettingsCategoryTodolist from "./categories/SettingsCategoryTodolist";
import SettingsCategoryWeather from "@/components/settings/categories/SettingsCategoryWeather";

export default {
  name: "SettingsModal",
  components: {
    SettingsCategoryWeather,
    SettingsCategoryTodolist,
    CloseIcon,
    LayoutButton,
    Box
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    }
  },
  methods: {
    /**
     * @param {Event} e
     */
    onKeyClose(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        this.handleClose(e);
      }
    }
  },
  created() {
    document.body.addEventListener("keyup", this.onKeyClose);
  },
  destroyed() {
    document.body.removeEventListener("keyup", this.onKeyClose);
  }
};
</script>

<style>
:root {
  --settings-second-color: #a0b3bf;
}

.settingsModal {
  max-width: 550px;
  margin: auto;
}

.settingsModal__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  overflow: auto;
  padding: var(--main-padding);
  background: var(--action-bg-color);
}

.settingsModal__title {
  margin: 1rem 0 3rem;
}

.settingsModal__close {
  position: absolute;
  right: var(--main-padding);
  top: var(--main-padding);
}
</style>
