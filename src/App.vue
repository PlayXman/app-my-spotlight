<template>
  <div class="app">
    <Background />
    <Container>
      <Row align="top">
        <Cell>
          <Weather />
        </Cell>
        <Cell>
          <QuickLinks />
        </Cell>
      </Row>
      <Row align="middle">
        <Time />
      </Row>
      <Row align="bottom">
        <Cell>
          <Settings />
          <BackgroundLocality />
        </Cell>
        <Cell>
          <TodoList />
        </Cell>
      </Row>
    </Container>
    <FirstStart />
  </div>
</template>

<script>
import Time from "./components/Time";
import Background from "./components/background/Background";
import Weather from "./components/Weather";
import Container from "./components/layout/Container";
import Row from "./components/layout/Row";
import Cell from "./components/layout/Cell";
import TodoList from "./components/todoList/TodoList";
import Settings from "./components/settings/Settings";
import QuickLinks from "./components/QuickLinks";
import Storage from "./models/storage/Storage";
import { DATA_STORE_NAME } from "./models/storage/StorageData";
import { SETTINGS_STORE_NAME } from "./models/settings/Settings";
import BackgroundLocality from "./components/background/BackgroundLocality";
import FirstStart from "./components/FirstStart";

//init storage
Storage()
  .updateDb(SETTINGS_STORE_NAME, "category")
  .updateDb(DATA_STORE_NAME, "type");

export default {
  components: {
    FirstStart,
    BackgroundLocality,
    QuickLinks,
    Settings,
    TodoList,
    Cell,
    Container,
    Row,
    Weather,
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
  background: #e5e8ea;
}
</style>
