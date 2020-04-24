<template>
  <svg width="50" height="50" viewBox="0 0 50 50" :aria-label="name">
    <slot />
  </svg>
</template>

<script>
export default {
  name: "IconBase",
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
svg {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.2));
  fill: var(--font-color);
}
</style>
