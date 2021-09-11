<template>
  <Box v-if="href" v-on:click="handleClick" class="backgroundLocality">
    {{ label }}
  </Box>
</template>

<script>
import Box from "../Box";
import Bg from "../../models/bg/Bg";

export default {
  components: { Box },
  data() {
    return {
      href: "",
      location: ""
    };
  },
  computed: {
    label: function() {
      return this.location || "View picture";
    }
  },
  methods: {
    update: function(picture) {
      this.href = picture.detail.link;
      this.location = picture.detail.location;
    },
    handleClick: function() {
      window.location.href = this.href;
    }
  },
  mounted() {
    const picture = Bg.getPicture();
    if (picture?.isSet()) {
      this.href = picture.link;
      this.location = picture.location;
    }
    Bg.observeUpdate(this.update);
  },
  destroyed() {
    Bg.removeObserver(this.update);
  }
};
</script>

<style>
.backgroundLocality {
  cursor: pointer;
  display: inline-block;
  text-shadow: var(--layout-items-shadow);
}
</style>
