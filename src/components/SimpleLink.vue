<template>
  <a :href="href" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      require: true
    },
    external: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    target() {
      return this.external ? "_blank" : null;
    },
    rel() {
      return this.external ? "noopener" : null;
    }
  }
};
</script>
