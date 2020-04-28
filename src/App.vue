<template>
  <div class="app">
    <Background />
    <div class="content">
      <div class="row--top">
        <div></div>
        <div></div>
      </div>
      <div class="row--middle">
        <Time />
      </div>
      <div class="row--bottom">
        <div>
          <Settings />
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "./components/Time";
import Background from "./components/Background";
import Settings from "./components/settings/Settings";

export default {
  name: "App",
  components: {
    Settings,
    Background,
    Time
  }
};
</script>

<style>
:root {
  --font-color: #fff;
  --font-dark-color: #585858;
  --action-color: #16a1d7;
  --action-hover-color: #26b1ec;
  --main-padding: 2rem;
  --element-border-radius: 4px;
}

html,
body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
}

* {
  box-sizing: border-box;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  width: 100vw;
  height: 100vh;
  color: var(--font-color);
}

.content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  padding: var(--main-padding);
}

.row--top,
.row--bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.row--top {
  align-items: flex-start;
}

.row--bottom {
  align-items: flex-end;
}

.row--middle {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
