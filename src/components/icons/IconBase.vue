<template>
  <svg
    class="icon"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    :aria-label="name"
    :fill="[fill ? 'currentColor' : 'none']"
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
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    fill: {
      type: Boolean,
      default: true
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
}
</style>
