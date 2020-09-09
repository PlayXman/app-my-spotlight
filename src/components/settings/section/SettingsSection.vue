<template>
  <section class="settingsSection">
    <h4 class="settingsSection__title" v-if="title">{{ title }}</h4>
    <form v-if="onsubmit" v-on:submit="handleSubmit">
      <slot />
    </form>
    <slot v-else />
  </section>
</template>

<script>
export default {
  name: "SettingsSection",
  props: {
    title: {
      type: String
    },
    onsubmit: {
      type: Function
    }
  },
  methods: {
    /**
     * @param {Event} e
     * @returns {boolean}
     */
    handleSubmit(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      this.onsubmit(data);
      return false;
    }
  }
};
</script>

<style>
.settingsSection:not(:last-child) {
  padding-bottom: 3rem;
  margin-bottom: 4rem;
  border-bottom: 1px dashed var(--settings-second-color);
}

.settingsSection__title {
  margin-bottom: 1rem;
}
</style>
