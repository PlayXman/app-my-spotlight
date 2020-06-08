<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container"
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  padding: var(--main-padding);
}
</style>
