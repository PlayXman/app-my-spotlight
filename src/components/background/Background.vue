<template>
  <div class="background" :style="{ backgroundImage: `url(${src})` }" />
</template>

<script>
import Bg from "../../models/bg/Bg";

const bgPicture = new Bg();

export default {
  data() {
    return {
      src: ""
    };
  },
  mounted() {
    bgPicture.getImage().then(picture => {
      this.src = picture.url;
    });
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
