import React from "react";
import axios from "axios";
import {toast} from "react-toastify";

const DeleteTodo = ({task, getTodos}) => {

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/api/v1/items/${id}`).then(
      (res) => {
        console.log(res)
        getTodos();
        toast.success('todo item deleted successfully', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    ).catch((error) => {
      console.log(error)
      toast.error('Something went wrong, try again later', {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }

  return (
    <div>
      <button type="button" className="btn btn-sm btn-danger" data-mdb-toggle="modal" data-mdb-target={"#deleteModal"+ task.id}>
        Delete
      </button>
      <div className="modal fade" id={"deleteModal"+ task.id} tabIndex="-1" aria-labelledby="deleteModalLabel"
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body"> Are you sure, you want to delete this Task?
              <br/>
              <span className="h5 mt-2 pt-3">{task.item}</span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">No, close</button>
              <button type="button" className="btn btn-danger" data-mdb-dismiss="modal" onClick={() => {deleteTodo(task.id)}}> Yes, Confirm  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
