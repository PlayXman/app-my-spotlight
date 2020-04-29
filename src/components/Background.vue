<template>
  <div>
    <div class="image" :style="{ backgroundImage: `url(${src})` }" />
    <div
      class="image image--new"
      v-if="transition"
      :style="{ backgroundImage: `url(${newSrc})` }"
      :class="{ show: transition }"
    />
  </div>
</template>

<script>
import BgPicture from "../models/BgPicture";

const bgPicture = new BgPicture();

export default {
  name: "Background",
  data: () => ({
    src: bgPicture.getLastImage(),
    transition: false,
    newSrc: ""
  }),
  mounted() {
    if (bgPicture.isSetCorrectly()) {
      bgPicture.getImage().then(url => {
        if (this.src !== url) {
          this.newSrc = url;
          this.transition = true;

          setTimeout(() => {
            this.src = url;
          }, 200);
          setTimeout(() => {
            this.transition = false;
          }, 500);
        }
      });
    }
  }
};
</script>

<style scoped>
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background ease 150ms;
}

.image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.image--new {
  opacity: 0;
  animation: show ease 150ms;
  animation-delay: 50ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>
