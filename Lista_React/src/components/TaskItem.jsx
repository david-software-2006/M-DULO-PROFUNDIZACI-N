import { useState } from "react";

export default function TaskItem({ task, removeTask }) {
  const [isDone, setIsDone] = useState(false);

  return (
    <li
      className={isDone ? "done" : ""}
      onClick={() => setIsDone(!isDone)}
    >
      {task}
      <button className="delete-btn" onClick={(e) => {
        e.stopPropagation(); 
        removeTask();
      }}>
        X
      </button>
    </li>
  );
}
