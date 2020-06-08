<template>
  <div class="app">
    <Background />
    <Container>
      <Row align="top">
        <Column>
          <Weather />
        </Column>
        <Column>
          <Button link="https://mail.google.com/mail/u/0/">
            <GmailIcon />
          </Button>
          <Button link="https://calendar.google.com/calendar/r">
            <CalendarIcon />
          </Button>
          <Button link="https://drive.google.com/drive/">
            <DriveIcon />
          </Button>
          <Button link="https://keep.google.com">
            <KeepIcon />
          </Button>
        </Column>
      </Row>
      <Row align="middle">
        <Time />
      </Row>
      <Row align="bottom">
        <Column />
        <Column />
      </Row>
    </Container>
  </div>
</template>

<script>
import Time from "./components/Time";
import Background from "./components/Background";
import Button from "./components/Button";
import KeepIcon from "./components/icons/KeepIcon";
import DriveIcon from "./components/icons/DriveIcon";
import GmailIcon from "./components/icons/GmailIcon";
import CalendarIcon from "./components/icons/CalendarIcon";
import Weather from "./components/Weather";
import Container from "./components/layout/Container";
import Row from "./components/layout/Row";
import Column from "./components/layout/Column";

export default {
  name: "App",
  components: {
    Column,
    Container,
    Row,
    Weather,
    CalendarIcon,
    GmailIcon,
    DriveIcon,
    KeepIcon,
    Button,
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
  --main-padding: 1.8rem;
  --element-border-radius: 4px;
  --layout-items-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}

html,
body {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}

* {
  box-sizing: border-box;
}

.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  color: var(--font-color);
}
</style>
