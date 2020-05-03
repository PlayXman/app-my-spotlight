<template>
  <div :style="{ backgroundImage: `url(${src})` }" />
</template>

<script>
import BgPicture from "../models/BgPicture";

const bgPicture = new BgPicture();

export default {
  name: "Background",
  data: () => ({
    src: bgPicture.getLastImage()
  }),
  mounted() {
    if (bgPicture.isSetCorrectly()) {
      bgPicture.getImage();
    }
  }
};
</script>

<style scoped>
div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
