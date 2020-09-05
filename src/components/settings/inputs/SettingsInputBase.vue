<template>
  <div class="settingsInput">
    <slot />
  </div>
</template>

<script>
export default {
  name: "SettingsInputBase"
};
</script>

<style>
.settingsInput {
  margin-bottom: 1rem;
}

.settingsInput__title {
  display: block;
  margin-bottom: 0.4em;
}
</style>
