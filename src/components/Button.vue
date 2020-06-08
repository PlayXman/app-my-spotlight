<template>
  <a
    :href="link"
    class="link"
    :class="{ 'link--active': isActive }"
    v-on:click="onClick"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "Button",
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

<style scoped>
.link {
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

.link:before {
  content: "";
  display: block;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0);
  opacity: 0;
  transition: transform 200ms ease-out, opacity 200ms ease;
}

.link:hover {
  text-decoration: none;
}
.link:hover:before {
  transform: scale(1);
  opacity: 1;
}

.link:focus {
  outline: none;
}

.link--active {
  border-color: var(--action-hover-color);
}
</style>
