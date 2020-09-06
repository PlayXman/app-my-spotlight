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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.settingsInput__title {
  display: block;
  margin-bottom: 0.4em;
  margin-right: 1rem;
  flex: 1 1 150px;
}

@media (min-width: 443px) {
  .settingsInput__title {
    margin-bottom: 0;
  }
}

.settingsInput__content {
  flex: 2 0 200px;
}
</style>
