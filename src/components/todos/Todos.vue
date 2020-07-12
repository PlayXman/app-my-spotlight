<template>
  <Box class="todos__wrapper" v-if="show" v-on:click="handleClick">
    <ul class="todos">
      <Todo
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
import Todo from "./Todo";
import Todoist from "../../models/todo/Todoist";
import Box from "../Box";

const todoist = new Todoist();

export default {
  name: "Todos",
  components: { Todo, Box },
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

<style scoped>
.todos__wrapper {
  width: 100%;
  max-width: 400px;
  cursor: pointer;
}

.todos {
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
