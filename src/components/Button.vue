<template>
  <a :href="link" :class="{ active: isActive }" v-on:click="onClick">
    <slot />
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    onClick: Function,
    link: {
      type: String,
      default: "#"
    },
    active: Boolean
  },
  computed: {
    isActive: function() {
      return this.active !== undefined ? this.active : false;
    }
  }
};
</script>

<style scoped>
a {
  display: block;
  width: 3rem;
  height: 3rem;
  padding: 0.4em;
  transition: background-color 150ms ease-in;
  background-color: transparent;
  text-decoration: none;
  border-radius: 50%;
  color: inherit;
  border: 1px solid transparent;
}

a:hover {
  background-color: rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

a:focus {
  outline: none;
}

.active {
  border-color: var(--action-hover-color);
}
</style>
