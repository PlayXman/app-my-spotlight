<template>
  <Box class="todoList__wrapper" v-if="show" v-on:click="handleClick">
    <ul class="todoList">
      <TodoItem
        v-for="item in items"
        :key="item.id"
        :text="item.text"
        :date="item.dueDate"
      />
      <li v-if="loading">Loading...</li>
      <li v-else-if="items.length === 0">Free day!</li>
    </ul>
  </Box>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoList from "../../models/todo/TodoList";
import Box from "../Box";
import TodolistSettings from "../../models/settings/TodolistSettings";

const todoList = new TodoList();

export default {
  name: "TodoList",
  components: { TodoItem, Box },
  data() {
    return {
      items: [],
      loading: true,
      show: false
    };
  },
  methods: {
    init: function() {
      todoList.isActive().then(result => {
        this.show = result;

        if (result) {
          todoList
            .getItems()
            .then(items => {
              this.items = items;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    handleClick: function() {
      window.location.href = "https://todoist.com/app/";
    }
  },
  mounted() {
    this.init();
    TodolistSettings.observeUpdate(this.init);
  },
  destroyed() {
    TodolistSettings.removeObserver(this.init);
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
