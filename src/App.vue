<template>
  <div class="app">
    <Background />
    <Container>
      <Row align="top">
        <Cell>
          <Weather />
        </Cell>
        <Cell>
          <LayoutButton link="https://mail.google.com/mail/u/0/">
            <GmailIcon />
          </LayoutButton>
          <LayoutButton link="https://calendar.google.com/calendar/r">
            <CalendarIcon />
          </LayoutButton>
          <LayoutButton link="https://drive.google.com/drive/">
            <DriveIcon />
          </LayoutButton>
          <LayoutButton link="https://keep.google.com">
            <KeepIcon />
          </LayoutButton>
        </Cell>
      </Row>
      <Row align="middle">
        <Time />
      </Row>
      <Row align="bottom">
        <Cell>
          <Settings />
        </Cell>
        <Cell>
          <TodoList />
        </Cell>
      </Row>
    </Container>
  </div>
</template>

<script>
import Time from "./components/Time";
import Background from "./components/Background";
import LayoutButton from "./components/LayoutButton";
import KeepIcon from "./components/icons/KeepIcon";
import DriveIcon from "./components/icons/DriveIcon";
import GmailIcon from "./components/icons/GmailIcon";
import CalendarIcon from "./components/icons/CalendarIcon";
import Weather from "./components/Weather";
import Container from "./components/layout/Container";
import Row from "./components/layout/Row";
import Cell from "./components/layout/Cell";
import TodoList from "./components/todoList/TodoList";
import Settings from "./components/settings/Settings";

export default {
  name: "App",
  components: {
    Settings,
    TodoList,
    Cell,
    Container,
    Row,
    Weather,
    CalendarIcon,
    GmailIcon,
    DriveIcon,
    KeepIcon,
    LayoutButton,
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
  --action-bg-color: rgba(44, 58, 66, 0.9);
  --main-padding: 1rem;
  --element-border-radius: 1rem;
  --layout-items-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}

@font-face {
  font-family: Josefin Sans;
  src: url("../public/fonts/JosefinSans-Thin.ttf");
  font-weight: 100;
}

@font-face {
  font-family: Josefin Sans;
  src: url("../public/fonts/JosefinSans-ExtraLight.ttf");
  font-weight: 200;
}

@font-face {
  font-family: Josefin Sans;
  src: url("../public/fonts/JosefinSans-Light.ttf");
  font-weight: 300;
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

@media (min-width: 32em) {
  :root {
    --main-padding: 1.8rem;
  }
}
</style>
