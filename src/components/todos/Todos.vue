<template>
  <div class="todos__wrapper" v-if="show">
    <ul class="todos">
      <Todo
        v-for="item in items"
        :key="item.id"
        :text="item.text"
        :date="item.dueDate"
      />
      <li v-if="items.length === 0">All done!</li>
    </ul>
  </div>
</template>

<script>
import Todo from "./Todo";
import Todoist from "../../models/todo/Todoist";

const todoist = new Todoist();

export default {
  name: "Todos",
  components: { Todo },
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
  }
};
</script>

<style scoped>
.todos__wrapper {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem 1.4rem;
  width: 100%;
  max-width: 400px;
  transition: background-color 200ms ease-out;
  border-radius: var(--element-border-radius);
}

.todos__wrapper:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.todos {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-weight: 300;
  text-shadow: 0 0 0;
  max-height: 23vh;
  overflow: auto;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.2);
  scrollbar-width: thin;
}
</style>
