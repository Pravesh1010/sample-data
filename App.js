import './App.css';
import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
// import { Addtask } from "./Addtask";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TextField from "@mui/material/TextField";


function App() {
  return (
    <div className="App">
     <ToDo />
    </div>
  );
}


function ToDo() {
  const addTask = (text) => updateTask([...tasks, { text }]);
  const [tasks, updateTask] = useState([
    {
      text: "Morning Workout",
      isCompleted: false,
    },
    {
      text: "Cold Shower",
      isCompleted: false,
    },
    {
      text: "High Protein breakfast",
      isCompleted: false,
    },
  ]);

  const toggleTask = (index) => {
    const newTask = [...tasks];
    newTask[index].isCompleted
      ? (newTask[index].isCompleted = false)
      : (newTask[index].isCompleted = true);
    updateTask(newTask);
  };

  const deleteTask = (index) => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    updateTask(newTask);
  };

  const handleDone = () => {
    const emptyTask = [];
    updateTask(emptyTask);
  };
  return (
    <div className="list-of-task-todo">
      <Addtask addTask={addTask} />

      {tasks.map((task, index) => (
        <div className="task-status">
          <span
            onClick={() => toggleTask(index)}
            className={task.isCompleted ? "task-name completed-task" : "task-name"}
          >
            {task.text}
          </span>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteTask(index)}
          >
            <DeleteIcon />
          </IconButton>

        </div>

      ))}
      <div>
        <IconButton 
            onClick={() => handleDone()}
            color="success"           
        >Done
            <DoneAllIcon />
        </IconButton>
      </div>
    </div>
  );
}

function Addtask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      addTask(value);
      setValue("");
    }
  };

  return (
    <div className="list-of-task-todo">
      <form onSubmit={handleSubmit}>
        <TextField
          value={value}
          type="text"
          onChange={(event) => setValue(event.target.value)}
          label="Add task"
          varient="filled"
          color="success"
          focused />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}


export default App;
