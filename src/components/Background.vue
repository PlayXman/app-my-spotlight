<template>
  <div class="background" :style="{ backgroundImage: `url(${src})` }" />
</template>

<script>
import BgPicture from "../models/BgPicture";

const bgPicture = new BgPicture();

export default {
  name: "Background",
  data() {
    return {
      src: ""
    };
  },
  mounted() {
    bgPicture
      .getLastPic()
      .then(url => {
        this.src = url;
      })
      .catch(url => {
        this.src = url;
      });
    bgPicture.getImage();
  }
};
</script>

<style>
.background {
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
