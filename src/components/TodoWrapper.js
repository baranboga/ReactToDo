import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import {
  addtodoo,
  deletetodoo,
  gettodo,
  putiscompleted,
  puttodoo,
} from "../request/todorequest";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    gettodo()
      .then((request) => {
        setTodos(request);
      })
      .catch(() => "");
  }, []);

  const addTodo = (todo) => {
    addtodoo(todo)
      .then((request) => {
        console.log(request);
        window.location.href = "/"
      })
      .catch(() => "");
  
  };

  const deleteTodo = (id) => {
    deletetodoo(id)
      .then((response) => {
        alert("Görev Silindi")
        window.location.href = "/"
      })
      .catch(() => "");
  };

  const toggleComplete = (id, value,task) => {
    const newvalue = !value;
    console.log(newvalue);
    putiscompleted(id, newvalue,task)
      .then((response) => {
        console.log(response);
      })
      .catch(() => "");
      window.location.href = "/"
  };

  const editTodo = () => {
    setEdit(true);
  };

  const editTask = (id, value) => {
    console.log(id, value);
    puttodoo(id, value)
      .then((response) => {
        window.location.href = "/"
      })
      .catch(() => "");
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        edit ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
