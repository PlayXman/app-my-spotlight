<template>
  <div
    class="box"
    :class="{ 'box--visible': bg }"
    v-on:click="$emit('click', null)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    bg: Boolean
  }
};
</script>

<style>
.box {
  padding: 1rem 1.4rem;
  border-radius: var(--element-border-radius);
  background-color: transparent;
  transition: background-color 200ms ease-out;
}

.box:hover,
.box--visible {
  background-color: var(--action-bg-color);
}
</style>
