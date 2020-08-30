<template>
  <a
    class="layoutButton"
    :class="{ 'layoutButton--active': isActive }"
    :href="link"
    v-on:click="onClick"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "LayoutButton",
  props: {
    onClick: {
      type: Function,
      default: () => true
    },
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

<style>
.layoutButton {
  display: inline-block;
  vertical-align: top;
  width: 3em;
  height: 3em;
  padding: 0.5em;
  text-decoration: none;
  border-radius: 50%;
  color: inherit;
  border: 2px solid transparent;
  position: relative;
  transition: border-color 150ms ease;
}

.layoutButton:before {
  content: "";
  display: block;
  position: absolute;
  background: var(--action-bg-color);
  border-radius: 50%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0);
  opacity: 0;
  transition: transform 200ms ease-out, opacity 200ms ease;
}

.layoutButton:hover {
  text-decoration: none;
}
.layoutButton:hover:before {
  transform: scale(1);
  opacity: 1;
}

.layoutButton:focus {
  outline: none;
}

.layoutButton--active {
  border-color: var(--action-hover-color);
}
</style>
