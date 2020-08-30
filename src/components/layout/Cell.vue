<template>
  <div class="cell">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Cell"
};
</script>

<style>
.cell > * {
  vertical-align: middle;
}

.cell > *:not(:last-child) {
  margin-right: 0.5rem;
}
</style>
