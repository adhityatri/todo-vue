<template>
  <a-row type="flex" class="wrapper">
    <a-col :span="6" class="todo-wrapper fixed">
      <h2>TODO</h2>

      <form v-on:submit="addTodo($event)">
        <input type="text" placeholder="Enter Todo" v-model="newTodo" />
        <input type="submit" />
      </form>
    </a-col>
    <a-col :span="18" class="todo-wrapper-list">
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span>{{todo.title}}</span>
        </li>
      </ul>
    </a-col>
  </a-row>
</template>

<script>
import Todo from "@/services/Todo.js";

export default {
  name: "home",
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    async addTodo (evt) {
      evt.preventDefault() // prevents the form's default action from redirecting the page
      const response = await Todo.addTodo(this.newTodo)
      this.todos.push(response.data)
      this.newTodo = '' // clear the input field
    },
    async loadTodos() {
      const response = await Todo.getTodos();
      this.todos = response.data;
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100%;
}

.todo {
  &-wrapper {
    background-color: white;
    height: 100vh;
    overflow: hidden;
    padding: 20px 50px;

    &-list {
      padding: 20px 50px;
    }
  }
}
</style>
