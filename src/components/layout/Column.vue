<template>
  <div class="col">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Column"
};
</script>

<style scoped>
.col > * {
  vertical-align: middle;
}

.col > *:not(:last-child) {
  margin-right: 0.5rem;
}
</style>
