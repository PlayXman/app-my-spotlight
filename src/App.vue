<template>
  <div class="app">
    <Background />
    <MiddleCont>
      <Time />
    </MiddleCont>
    <Settings />
  </div>
</template>

<script>
import MiddleCont from "./layouts/MiddleCont";
import Time from "./components/Time";
import Background from "./components/Background";
import Settings from "./components/settings/Settings";

export default {
  name: "App",
  components: {
    Settings,
    Background,
    Time,
    MiddleCont
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
</style>
