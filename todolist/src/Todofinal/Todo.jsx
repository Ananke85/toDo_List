import { format } from "date-fns";
import ToggleButton from "../components/ToggleButton/ToggleButton";
import Buttons from "../components/Buttons/Buttons";
import "../components/TodosList/todoslist.css";

const Todo = ({ todo, setRefresh, refresh }) => {
  const { id, text, fecha, done } = todo;
  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return format(parsedDate, "dd/MM");
  };
  console.log(todo);

  return (
    <>
      <li key={todo.id} className="todos">
        <ToggleButton
          id={todo.id}
          todo={todo}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <div className={`text ${done ? "completed" : ""}`}>
          <div className="details">
            <h3 className="fecha">{formatDate(fecha)}</h3>
            <h3>{text}</h3>
          </div>
        </div>
        <Buttons
          id={id}
          text={text}
          fecha={fecha}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </li>
    </>
  );
};

export default Todo;
