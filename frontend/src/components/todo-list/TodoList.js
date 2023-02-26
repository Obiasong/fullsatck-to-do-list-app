import React from "react";
import Todo from "../todo/todo";
import AddTodo from "../add_todo/add_todo";

const TodoList = ({tasks, getTodos}) => {
  return (
    <div>
      <h3 className="text-center mt-4"> To-do List </h3>
      <div className="container">
        <AddTodo getTodos={getTodos}/>
      </div>
      <div className="container">
        {
          tasks.map((task) =>
            (
              <Todo key={task.id} task={task} getTodos={getTodos}/>
            )
          )
        }
      </div>
    </div>
  );
};

export default TodoList;
