import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

const AddTodo = ({getTodos}) => {
  const createTodo = (data) => {
    const formData = new FormData();
    formData.append('item',data.item)
    formData.append('photo',data.photo[0])
    formData.append('description',data.description)
    axios.post('http://localhost:8000/api/v1/items', formData)
      .then((res) => {
        getTodos();
        toast.success('todo item added', {
          position: toast.POSITION.TOP_RIGHT
        })
        reset();
      }).catch((errors) => {
      toast.error('something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }
  const {register, handleSubmit, formState: { errors }, reset} = useForm();
  return (
    <div>
      <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#addModal">
        Add To-do Item
      </button>
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              Add to-do item
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit((data) => createTodo(data))}>
                <div>
                  <label htmlFor="title"> Title<span className="text-danger">*</span> </label>
                  <input {...register('item',{required:true})} id="title" type="text" className="form-control" placeholder="Enter item title"/>
                  { errors.item && <small className="text-danger"></small>}
                </div>
                <div className="mt-2">
                  <label htmlFor="description"> Description <span className="text-danger">*</span> </label>
                  <br/>
                  <textarea {...register('description',{required:true})} className="form-control" id="description" cols="30" rows="5"
                  placeholder="Description of the item">
                  </textarea>
                  { errors.description && <small className="text-danger"></small>}
                </div>
                <div className="mt-2">
                  <label htmlFor="title"> Upload image <span className="text-danger">*</span></label>
                  <input {...register('photo')} name="photo" type="file" className="form-control" />
                </div>
                <div className="mt-2">
                  <button className="mt-2 btn btn-success" type="submit" data-mdb-dismiss="modal"> Save </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
