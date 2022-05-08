import React, { useEffect, useState } from "react";
import { TaskList } from "../Assets/Components/TaskList/TaskList";

export const MainPage = () => {
  const [TaskInput, setTaskInput] = useState("");
  const [Task, setTask] = useState([]);


  //ambil data dari local storage
  useEffect(() => {
    //cek ada data atau tidak
    if (localStorage.getItem("localTasks")) {

      //ambil data dari lcoal storage dan rubah data ke JSON
      const TaskStored = JSON.parse(localStorage.getItem("localTasks"));

      //data dari local storage dimasukan ke state Task
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


  // handle delete
  const handleDelete = (task)=>{
    const deleted = Task.filter((t)=>t.id !== task.id);
    setTask(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted))
}

// handle clear
const handleClear=()=>{
  setTask([]);
  localStorage.removeItem("localTasks");
}

  const showTask = (data) => {
    let dataTask = data;

    return dataTask.map((value, index) => {
      return <TaskList Text={value.title} />;
    });
  };

  return (
    <div>
      <h1> To Do App</h1>
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

      {showTask(Task)}


      {/* Tombol delete */}

      <div className="tbl-delete">
                <button
                onClick ={()=> handleDelete(Task)}
                >delete</button>
            </div>

      {/* tombol clear */}

            <div className="tbl-clear">
              <button onClick={()=>handleClear()}>
                  Clear
              </button>
          </div>
    </div>
    
  );
};
