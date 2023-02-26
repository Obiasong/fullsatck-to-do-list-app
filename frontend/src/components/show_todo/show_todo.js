import React from "react";

const ShowTodo = ({task}) => {
  return(
    <div>
      <button type="button" className="btn btn-sm btn-info" data-mdb-toggle="modal" data-mdb-target={'#showModal' + task.id}>
        view details
      </button>
      <div class="modal fade" id={'showModal' + task.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"> {task.item} </h5>
              <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="row">
              <div className="col-6 text-left">
                <img className="img-thumbnail mx-3" height="100" width="100"
                     src={(task.photo) ? `http://localhost:8000/storage/${task.photo}`: "https://via.placeholder.com/300.png/09f/fff.png"} alt="todo attachment"/>
              </div>
              <div className="col-6 text-right">
                <span className="btn btn-outline-dark m-3">{task.status}</span>
              </div>
            </div>
            <div class="modal-body text-left mt-1">{task.description}</div>
            <div class="modal-footer mt-2">
              <button type="button" class="btn btn-danger" data-mdb-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTodo;
