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
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    fill: {
      type: Boolean,
      default: false
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
