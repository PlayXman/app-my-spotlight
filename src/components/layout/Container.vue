<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto 1fr;
  position: relative;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  padding: var(--main-padding);
}
</style>
