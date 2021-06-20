<template>
  <div class="settings">
    <LayoutButton :on-click="toggleOpen">
      <SettingsIcon />
    </LayoutButton>
    <transition name="settings__fade">
      <SettingsModal v-if="open" :handle-close="toggleOpen" />
    </transition>
  </div>
</template>

<script>
import LayoutButton from "../LayoutButton";
import SettingsModal from "./SettingsModal";
import SettingsIcon from "../icons/SettingsIcon";

export default {
  components: { SettingsIcon, SettingsModal, LayoutButton },
  data: () => ({
    open: false
  }),
  methods: {
    /**
     * @param {Event} e
     */
    toggleOpen(e) {
      e.preventDefault();
      this.open = !this.open;
    }
  }
};
</script>

<style>
.settings {
  display: inline-block;
}

.settings a {
  color: inherit;
}

.settings__fade-enter-active,
.settings__fade-leave-active {
  transition: opacity 300ms;
}

.settings__fade-enter,
.settings__fade-leave-to {
  opacity: 0;
}
</style>
