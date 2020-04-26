<template>
  <div class="modal__wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MiddleCont"
};
</script>

<style scoped>
.modal__wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
