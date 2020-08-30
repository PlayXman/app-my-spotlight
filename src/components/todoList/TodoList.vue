<template>
  <Box class="todoList__wrapper" v-if="show" v-on:click="handleClick">
    <ul class="todoList">
      <TodoItem
        v-for="item in items"
        :key="item.id"
        :text="item.text"
        :date="item.dueDate"
      />
      <li v-if="items.length === 0">All done!</li>
    </ul>
  </Box>
</template>

<script>
import TodoItem from "./TodoItem";
import Todoist from "../../models/todo/Todoist";
import Box from "../Box";

const todoist = new Todoist();

export default {
  name: "TodoList",
  components: { TodoItem, Box },
  computed: {
    show: function() {
      return todoist.isActive();
    },
    items: function() {
      if (!todoist.isActive()) {
        return [];
      }
      return todoist.getItems().filter(item => item.isDue());
    }
  },
  methods: {
    handleClick: function() {
      window.location.href = "https://todoist.com/app/";
    }
  }
};
</script>

<style>
.todoList__wrapper {
  width: 100%;
  max-width: 400px;
  cursor: pointer;
}

.todoList {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-weight: 300;
  text-shadow: var(--layout-items-shadow);
  max-height: 23vh;
  overflow: auto;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.2);
  scrollbar-width: thin;
}
</style>
