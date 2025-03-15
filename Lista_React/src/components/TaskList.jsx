import TaskItem from "./TaskItem";

export default function TaskList({ tasks, setTasks }) {
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <ul id="list">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} removeTask={() => removeTask(index)} />
      ))}
    </ul>
  );
}
