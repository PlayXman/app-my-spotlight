<template>
  <li class="todoItem">
    <span v-html="text"></span>
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
  animation: 300ms ease-out forwards appear;
}

.todoItem:not(:last-child) {
  margin-bottom: 0.5rem;
}

.todoItem__date {
  font-size: 0.75em;
  line-height: 1;
  display: inline-block;
  vertical-align: baseline;
  padding: 0.125rem 0.1875rem 0.0625rem;
  margin-left: 0.5em;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--element-border-radius);
  text-shadow: none;
}
</style>
