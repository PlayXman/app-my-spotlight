<template>
  <li class="todo">
    <a v-if="link" :href="link" class="todo__link">
      {{ text }} <span class="todo__date" v-if="date">{{ date }}</span>
    </a>
    <div v-else>
      {{ text }} <span class="todo__date" v-if="date">{{ date }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: "Todo",
  props: {
    text: {
      type: String,
      required: true
    },
    date: String,
    link: String
  }
};
</script>

<style scoped>
.todo {
  position: relative;
  padding-left: 1.3em;
}

.todo:not(:last-child) {
  margin-bottom: 0.5rem;
}

.todo__link {
  color: inherit;
  text-decoration: none;
}

.todo__link:hover {
  text-decoration: underline;
}

.todo:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  opacity: 0.3;
  border: 1px solid var(--font-color);
  border-radius: 50%;
  width: 0.7em;
  height: 0.7em;
}

.todo__date {
  font-size: 0.8em;
  display: inline-block;
  padding: 0 0.2em;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--element-border-radius);
}
</style>
