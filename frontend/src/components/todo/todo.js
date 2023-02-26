import React from "react";
import EditModal from "../edit_model/edit_model";
import DeleteTodo from "../delete_todo/deleteTodo";
import ShowTodo from "../show_todo/show_todo";
import axios from "axios";
import {toast} from "react-toastify";

const Todo = ({task, getTodos}) => {
  const completeTodo = (id) => {
    axios.get(`http://localhost:8000/api/v1/items/${id}/complete`)
      .then((res) => {
        toast.success('todo item completed', {
          position: toast.POSITION.TOP_RIGHT
        })
      }).catch((error) => {
        toast.error('something went wrong try again later', {
          position: toast.POSITION.TOP_RIGHT
        })
    });
    getTodos()

  }
  // Check if item is completed
  const isCompleted = task.status === 'completed';
  return (
    <div>
      <div className="card my-3">
        <div className="card-header">
          <div className="card-title">
            <div className="row">
            <div className="col-9">
             <b>{task.item}</b>
            </div>
            <div className="col-3 text-right">
              <ShowTodo task={task}/>
            </div>
            </div>

          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-2 col-auto">
              <img className="img-fluid"  height="110" width="120" src={(task.photo)? `http://localhost:8000/storage/${task.photo}`: 'https://via.placeholder.com/300.png/09f/fff.png'}/>
            </div>
            <div className="col-10">
              <p> {task.description} </p>
              <div>
                <small className="text-muted"> Created: {task.created_at.split("T")[0]} {task.created_at.split("T")[1].split("00")[0]} </small>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <div className="d-flex gap-1">
                    {isCompleted ?
                      (<span className={"btn-sm nav-item"}></span>) :
                      (<button className={"btn btn-sm btn-success nav-item"} onClick={() => {completeTodo(task.id)}}>Complete</button>)
                    }
                    <div className="nav-item">
                      <EditModal task={task} getTodos={getTodos} />
                    </div>
                    <div>
                      <DeleteTodo task={task} getTodos={getTodos}/>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-right">
                  <div>
                    <button className={(task.status === "completed")? "btn btn-sm text-success disabled rounded-pill" : "btn btn-sm text-danger disabled rounded-pill" }> {task.status} </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
