import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

const EditModal = ({task, getTodos}) => {
  const {register, handleSubmit, formState: { errors }, reset} = useForm({'item': task.item});
  useEffect(() => {
    reset(task);
  }, [task]);

  function editTodo(data) {
    const formData = new FormData();
    formData.append('item',data.item)
    if(data.photo[0] instanceof File) {
      formData.append('photo', data.photo[0])
    }
    formData.append('description',data.description)
    formData.append('_method', "PUT")
    axios.post(`http://localhost:8000/api/v1/items/${task.id}`, formData)
      .then((res) => {
        getTodos();
        toast.success('todo item updated', {
          position: toast.POSITION.TOP_RIGHT
        })
        reset();
      }).catch((errors) => {
      toast.error('something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      })
    })

  }
  return(
    <div>
      <button type="button" class="btn btn-sm btn-primary" data-mdb-toggle="modal" data-mdb-target={"#editModal" + task.id}>
        Edit
      </button>
      <div class="modal fade" id={"editModal" + task.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel">Edit item <br/><span className="text-muted h5">{task.item}</span> </h6>
              <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit((data) => editTodo(data))}>
                <div>
                  <label htmlFor="title"> Title<span className="text-danger">*</span> </label>
                  <input {...register('item',{required:true})} id="title" type="text" className="form-control" placeholder="enter task title"/>
                  { errors.item && <small className="text-danger"></small>}
                </div>
                <div className="mt-2">
                  <label htmlFor="description"> Description<span className="text-danger">*</span> </label>
                  <br/>
                  <textarea {...register('description',{required:true})} className="form-control" id="description" cols="30" rows="5"></textarea>
                  { errors.description && <small className="text-danger"></small>}
                </div>
                <div className="mt-2">
                  <label htmlFor="title"> Upload image </label>
                  <input {...register('photo')} name="photo" type="file" className="form-control" />
                </div>
                <div className="mt-3">
                  <button data-mdb-dismiss="modal" type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
