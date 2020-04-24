<template>
  <div>
    <label v-bind:for="id">{{ label }}</label>
    <input v-bind:id="id" v-bind:type="type" v-model="inputVal" />
  </div>
</template>

<script>
export default {
  name: "Field",
  props: {
    label: String,
    type: String,
    id: String,
    value: String
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style scoped>
div:not(:last-child) {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.4em;
}

input {
  display: block;
  width: 100%;
  border: 1px solid var(--font-dark-color);
  border-radius: var(--element-border-radius);
  padding: 0.5em;
  font-size: inherit;
}
</style>
