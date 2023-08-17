import React, { useEffect, useState } from "react";
import "./todosList.css";
import Todo from "../../Todofinal/Todo";

const TodosList = (props) => {
  let payload;
  const { refresh, setRefresh } = props;
  const [todos, setTodos] = useState([]);

  const getTodosfromApi = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo");
      if (response.ok) {
        payload = await response.json();
      } else {
        throw new Error();
      }
      setTodos(payload);
    } catch (fetchError) {
      console.log(fetchError);
    }
  };

  useEffect(() => {
    getTodosfromApi();
  }, [refresh]);

  const sortedTodos = todos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));


  return (
    <div className="todosList">
      {sortedTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  );
};

export default TodosList;
