<template>
  <div class="settingsModal__wrapper">
    <div class="settingsModal__content">
      <Box class="settingsModal" bg>
        <h2 class="settingsModal__title">Settings</h2>
        <div>
          <SettingsCategoryTime />
          <SettingsCategoryWeather />
          <SettingsCategoryQuickLinks />
          <SettingsCategoryBackground />
          <SettingsCategoryTodolist />
          <SettingsCategoryThankYou />
        </div>
      </Box>
    </div>
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
import SettingsCategoryWeather from "./categories/SettingsCategoryWeather";
import SettingsCategoryQuickLinks from "./categories/SettingsCategoryQuickLinks";
import SettingsCategoryBackground from "./categories/SettingsCategoryBackground";
import SettingsCategoryThankYou from "./categories/SettingsCategoryThankYou";
import SettingsCategoryTime from "./categories/SettingsCategoryTime";

export default {
  components: {
    SettingsCategoryTime,
    SettingsCategoryThankYou,
    SettingsCategoryBackground,
    SettingsCategoryQuickLinks,
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
  background: var(--action-bg-color);
}

.settingsModal__content {
  padding: var(--main-padding);
}

.settingsModal__title {
  margin: 1rem 0 3rem;
}

.settingsModal__close {
  position: fixed;
  right: calc(var(--main-padding) * 2);
  top: var(--main-padding);
}
</style>
