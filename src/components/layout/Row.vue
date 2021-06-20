<template>
  <div class="row" :class="[alignClass]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      validator: function(val) {
        return ["top", "middle", "bottom"].includes(val);
      }
    }
  },
  computed: {
    alignClass: function() {
      return `row--${this.align}`;
    }
  }
};
</script>

<style>
.row {
  display: flex;
}

.row--top,
.row--bottom {
  justify-content: space-between;
}

.row--top {
  align-items: flex-start;
}

.row--middle {
  flex-direction: column;
  align-items: center;
}

.row--bottom {
  align-items: flex-end;
}
</style>
