<template>
  <div class="settings">
    <Button v-bind:on-click="toggleOpen" :active="open" class="button">
      <SettingsIcon />
    </Button>
    <transition name="fade">
      <Modal v-if="open" />
    </transition>
  </div>
</template>

<script>
import Button from "../Button";
import Modal from "./Modal";
import SettingsIcon from "../icons/SettingsIcon";

export default {
  name: "Settings",
  components: { SettingsIcon, Modal, Button },
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

<style scoped>
.settings {
  position: absolute;
  left: var(--main-padding);
  right: var(--main-padding);
  top: var(--main-padding);
  bottom: var(--main-padding);
}

.button {
  position: absolute;
  bottom: 0;
  left: 0;
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
