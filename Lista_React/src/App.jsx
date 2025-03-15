import { useState } from "react";
import TaskList from "./components/TaskList";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("Debes escribir una tarea");
      return;
    }
    setTasks([...tasks, inputValue.trim()]);
    setInputValue("");
  };

  return (
    <div className="container_list">
      <h1>TAREAS</h1>
      <input
        type="text"
        id="input"
        placeholder="Escribe una tarea"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button className="btn" id="btn" onClick={addTask}>
        Agregar
      </button>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
