import { useState } from "react";
import TodosList from "../TodosList/TodosList";
import CreateTodo from "../CreateTodo/CreateTodo";
import "./list.css";

const List = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="listContainer">
      <div className="newTask">
        <CreateTodo refresh={refresh} setRefresh={setRefresh} />
      </div>

      <div className="pendingTasks">
        <h2>My Pending Tasks</h2>
        <TodosList refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default List;