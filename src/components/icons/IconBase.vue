<template>
  <svg
    class="icon"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    :aria-label="name"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.icon {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(var(--layout-items-shadow));
  fill: currentColor;
}
</style>
