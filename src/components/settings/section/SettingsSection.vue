<template>
  <section class="settingsSection">
    <h4 class="settingsSection__title" v-if="title">{{ title }}</h4>
    <slot />
  </section>
</template>

<script>
export default {
  name: "SettingsSection",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style>
.settingsSection:not(:last-child) {
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px dashed var(--settings-second-color);
}

.settingsSection__title {
  margin-bottom: 1rem;
}
</style>
