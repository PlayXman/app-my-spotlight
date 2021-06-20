<template>
  <div class="firstStart" v-if="display" v-on:click="handleClick">
    <div class="firstStart__text">
      <h2>Welcome!</h2>
      <p>
        Start by opening the settings and selecting the features you want to use
      </p>
    </div>
    <div class="firstStart__line">
      <i class="firstStart__line-circle" />
    </div>
  </div>
</template>

<script>
import Application from "../models/Application";

export default {
  data() {
    return {
      display: false
    };
  },
  methods: {
    handleClick() {
      Application.setNotFirstStart().then(() => {
        this.display = false;
      });
    }
  },
  mounted() {
    Application.isFirstStart().then(isFirst => {
      this.display = isFirst;
    });
  }
};
</script>

<style>
.firstStart {
  background: rgba(0, 0, 0, 0.35);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: var(--main-padding);
  cursor: pointer;
}

.firstStart__text {
  text-shadow: var(--layout-items-shadow);
  line-height: 1.2;
  max-width: 435px;
}
.firstStart__text h2 {
  font-size: 2.25rem;
  margin: 0;
}
.firstStart__text p {
  font-size: 1.5rem;
  margin: 0 0 1rem;
}

.firstStart__line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;
  height: 8rem;
  padding-bottom: 3rem;
}

.firstStart__line-circle {
  width: 11px;
  height: 11px;
  padding: 2px;
  border: 1px solid var(--font-color);
  border-radius: 50%;
}

.firstStart__line:before,
.firstStart__line-circle:after {
  content: "";
  display: block;
  background: var(--font-color);
  box-shadow: var(--layout-items-shadow);
}
.firstStart__line:before {
  content: "";
  display: block;
  width: 1px;
  flex-grow: 1;
}
.firstStart__line-circle:after {
  content: "";
  display: block;
  height: 100%;
  border-radius: 50%;
}
</style>
