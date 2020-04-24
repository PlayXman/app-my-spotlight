<template>
  <div class="modal__wrapper" :style="{ backgroundImage: `url(${src})` }" />
</template>

<script>
import BgPicture from "../models/BgPicture";

export default {
  name: "Background",
  data: () => ({
    src: ""
  }),
  mounted() {
    const bgPicture = new BgPicture();

    if (bgPicture.isSetCorrectly()) {
      bgPicture
        .getImage()
        .then(url => {
          this.src = url;
        })
        .catch(url => {
          this.src = url;
        });
    }
  }
};
</script>

<style scoped>
.modal__wrapper {
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
