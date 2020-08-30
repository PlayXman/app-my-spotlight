<template>
  <div class="settings">
    <LayoutButton v-bind:on-click="toggleOpen" :active="open">
      <SettingsIcon />
    </LayoutButton>
    <transition name="fade">
      <SettingsModal v-if="open" />
    </transition>
  </div>
</template>

<script>
import LayoutButton from "../LayoutButton";
import SettingsModal from "./SettingsModal";
import SettingsIcon from "../icons/SettingsIcon";

export default {
  name: "Settings",
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
  position: relative;
  overflow: visible;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
