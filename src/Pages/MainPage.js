import React, { useEffect, useState } from "react";
import { TaskList } from "../Assets/Components/TaskList/TaskList";

export const MainPage = () => {
  const [TaskInput, setTaskInput] = useState("");
  const [Task, setTask] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const TaskStored = JSON.parse(localStorage.getItem("localTasks"));
      setTask(TaskStored);
    }
  }, []);

  const addTask = (e) => {
    if (TaskInput) {
      const newTask = { id: new Date().getTime().toString(), title: TaskInput };
      setTask([...Task, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...Task, newTask]));
      setTaskInput("");
    }
  };

  const showcard = (data) => {
    let dataTask = data;

    return dataTask.map((value, index) => {
      return <TaskList Text={value.title} />;
    });
  };

  return (
    <div>
      <input
        type="text"
        value={TaskInput}
        onChange={(e) => {
          setTaskInput(e.target.value);
        }}
      />
      {console.log(TaskInput)}
      <button
        onClick={() => {
          addTask();
        }}
      >
        Tambah
      </button>

      {showcard(Task)}
    </div>
  );
};
