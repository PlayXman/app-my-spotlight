<template>
  <p class="settingsSectionHint">
    <slot />
  </p>
</template>

<script>
export default {
  name: "SettingsSectionHint"
};
</script>

<style>
.settingsSectionHint {
  margin: 0 0 1rem;
  padding-left: 1.5rem;
  position: relative;
  color: var(--settings-second-color);
}

.settingsSectionHint:before {
  content: "i";
  text-align: center;
  display: block;
  border: 1px solid currentColor;
  border-radius: 50%;
  width: 1em;
  line-height: 1;
  position: absolute;
  left: 0;
  font-size: 0.75rem;
}
</style>
