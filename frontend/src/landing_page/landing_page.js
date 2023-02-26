import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import TodoList from "../components/todo-list/TodoList";
import axios from "axios";
import {toast} from "react-toastify";

const LandingPage = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = () => {
    axios.get('http://localhost:8000/api/v1/items').then(
      (res) => {
        setTodos(res.data.data);
      }
    ).catch((error) => {
      toast.error('Something went wrong, try again later', {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }
  useEffect(() => {
    getTodos();
  },[])
  return (
    <div>
      <Navbar />
      <div>
        <TodoList tasks={todos} getTodos={getTodos} />
      </div>
    </div>
  )
};

export default LandingPage;
