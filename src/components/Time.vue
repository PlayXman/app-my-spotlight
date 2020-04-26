<template>
  <div class="modal__wrapper">
    {{ time }}
  </div>
</template>

<script>
function createTime() {
  const d = new Date();

  return `${d.getHours()}:${(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()}`;
}

export default {
  name: "Time",
  data: () => ({
    listener: null,
    time: createTime()
  }),
  mounted() {
    this.listener = setInterval(() => {
      this.time = createTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.listener);
  }
};
</script>

<style scoped>
.modal__wrapper {
  font-size: 9rem;
  line-height: 1;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
