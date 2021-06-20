<template>
  <li class="todoItem">
    <span v-html="text"></span>{{ " " }}
    <span class="todoItem__date" v-if="date">{{ date }}</span>
  </li>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    date: String
  }
};
</script>

<style>
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.todoItem {
  position: relative;
  padding-left: 1.3em;
  animation: 300ms ease-out forwards appear;
}

.todoItem:not(:last-child) {
  margin-bottom: 0.5rem;
}

.todoItem:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  opacity: 0.3;
  border: 1px solid var(--font-color);
  border-radius: 50%;
  width: 0.75em;
  height: 0.75em;
}

.todoItem__date {
  font-size: 0.8em;
  display: inline-block;
  padding: 0 0.2em;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--element-border-radius);
}
</style>
