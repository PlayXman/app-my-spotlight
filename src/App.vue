<template>
  <div class="app">
    <Background />
    <Container>
      <Row align="top">
        <Cell>
          <WeatherWidget />
        </Cell>
        <Cell>
          <QuickLinksWidget />
        </Cell>
      </Row>
      <Row align="middle">
        <TimeWidget />
      </Row>
      <Row align="bottom">
        <Cell>
          <Settings />
          <BackgroundLocality />
        </Cell>
        <Cell>
          <TodoListWidget />
        </Cell>
      </Row>
    </Container>
    <FirstStart />
  </div>
</template>

<script>
import TimeWidget from "./components/TimeWidget";
import Background from "./components/background/Background";
import WeatherWidget from "./components/weather/WeatherWidget";
import Container from "./components/layout/Container";
import Row from "./components/layout/Row";
import Cell from "./components/layout/Cell";
import TodoListWidget from "./components/todoList/TodoListWidget";
import Settings from "./components/settings/Settings";
import QuickLinksWidget from "./components/QuickLinksWidget";
import BackgroundLocality from "./components/background/BackgroundLocality";
import FirstStart from "./components/FirstStart";

export default {
  components: {
    FirstStart,
    BackgroundLocality,
    QuickLinksWidget,
    Settings,
    TodoListWidget,
    Cell,
    Container,
    Row,
    WeatherWidget,
    Background,
    TimeWidget
  }
};
</script>

<style>
:root {
  --font-color: #fff;
  --font-medium-color: #8e9ca4;
  --font-dark-color: #585858;
  --action-color: #16a1d7;
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

@font-face {
  font-family: Josefin Sans;
  src: url("../public/fonts/JosefinSans-Bold.ttf");
  font-weight: 700;
}

body {
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
