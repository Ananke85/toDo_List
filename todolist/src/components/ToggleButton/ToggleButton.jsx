import React from "react";
import "./toggleButton.css";
import { useState } from "react";

const ToggleButton = (props) => {
  const [isDone, setIsDone] = useState(props.todo.done);
  const [showMessage, setShowMessage] = useState(false);
  const id = props.id;
  const { refresh, setRefresh } = props;

  const handleAlert = () => {
    setShowMessage(false);
  };

  const handleDone = async () => {
    try {
      const updatedData = { done: !isDone };
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      setIsDone(!isDone);
      setRefresh(!refresh);
      setShowMessage(true);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      {showMessage && (
        <div className="alert">
          {isDone
          ? "You have marked this task as completed"
          : "You have marked this task as pending"}
          <button onClick={handleAlert} className="accept">
            Accept
          </button>
        </div>
      )}
      <label className="buttonToggle">
        <input type="checkbox" checked={isDone} onChange={handleDone} />
        <span className="slider" />
      </label>
    </>
  );
};

export default ToggleButton;
