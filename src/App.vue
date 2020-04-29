<template>
  <div class="app">
    <Background />
    <div class="content">
      <div class="row row--top">
        <div>
          <Weather />
        </div>
        <div>
          <Button link="https://mail.google.com/mail/u/0/"
            ><GmailIcon
          /></Button>
          <Button link="https://calendar.google.com/calendar/r"
            ><CalendarIcon
          /></Button>
          <Button link="https://drive.google.com/drive/"><DriveIcon /></Button>
          <Button link="https://keep.google.com"><KeepIcon /></Button>
        </div>
      </div>
      <div class="row row--middle">
        <Time />
      </div>
      <div class="row row--bottom">
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
import Button from "./components/Button";
import KeepIcon from "./components/icons/KeepIcon";
import DriveIcon from "./components/icons/DriveIcon";
import GmailIcon from "./components/icons/GmailIcon";
import CalendarIcon from "./components/icons/CalendarIcon";
import Weather from "./components/Weather";

export default {
  name: "App",
  components: {
    Weather,
    CalendarIcon,
    GmailIcon,
    DriveIcon,
    KeepIcon,
    Button,
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

.row {
  display: flex;
}

.row > div > * {
  vertical-align: middle;
}
.row > div > *:not(:last-child) {
  margin-right: 0.5rem;
}

.row--top,
.row--bottom {
  justify-content: space-between;
  flex-wrap: wrap;
}

.row--top {
  align-items: center;
}

.row--bottom {
  align-items: flex-end;
}

.row--middle {
  flex-direction: column;
  align-items: center;
}
</style>
