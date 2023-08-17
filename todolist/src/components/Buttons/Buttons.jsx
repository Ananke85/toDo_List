import React, { useState } from "react";
import "./buttons.css";
import { useForm } from "react-hook-form";
import "../CreateTodo/createTodo.css";

const Buttons = (props) => {
  const id = props.id;
  const { refresh, setRefresh } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deletionAlert, setDeletionAlert] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleDelete = async () => {
    setDeletionAlert(true);
  };

  const handleConfirmDeletion = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setRefresh(!refresh);
    setDeletionAlert(false);
  };

  const handleCancel = () => {
    setDeletionAlert(false);
  };

  const handleEdit = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`)
      .then((res) => res.json())
      .then((data) => {
        reset({ text: data.text, fecha: data.fecha });
      });
    setIsEditing(true);
    setUpdateAlert(false);
  };

  const onSubmit = async (data) => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setIsEditing(false);
    setRefresh(!refresh);
    setUpdateAlert(true);
  };

  const handleCloseAlert = () => {
    setUpdateAlert(false);
  };

  return (
    <>
      {!isEditing && (
        <div className="buttons">
          <button onClick={() => handleEdit(id)} className="edit">
            <span className="icon-pencil1"></span>
          </button>

          {deletionAlert && (
            <div className="alert">
              You are about to delete this task. Are you sure?
              <div className="alertButtons">
                <button
                  onClick={() => handleConfirmDeletion(id)}
                  className="accept"
                >
                  Absolutely
                </button>
                <button onClick={handleCancel} className="accept">
                  Not yet
                </button>
              </div>
            </div>
          )}
          <button onClick={() => handleDelete(id)} className="delete">
            <span className="icon-bin"></span>
          </button>
        </div>
      )}

      {isEditing && (
        <>
          <form className="editionContainer" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("text")}
              className="formBoxEdition"
            />
            <input
              type="date"
              {...register("fecha")}
              className="formBoxEdition"
            />
            <button type="submit" className="editTask">
              SAVE
            </button>
          </form>
        </>
      )}

      {updateAlert && (
        <div className="alert">
          You have updated your task.
          <button onClick={handleCloseAlert} className="accept">
            Great!!
          </button>
        </div>
      )}
    </>
  );
};

export default Buttons;