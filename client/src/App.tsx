import { useState, useEffect, useDeferredValue } from "react";
import "./App.css";
import axios from "axios";



interface Task {
  id: number;
  title: string;
  completed: boolean;
}


const baseUrl = import.meta.env.VITE_BACK_END as string;
const token = import.meta.env.VITE_ACCESS_TOKEN_SECRET

const isProduction = import.meta.env.MODE === "production";
const origin = isProduction ? baseUrl : "http://localhost:8000";

const baseAxios = axios.create({
  baseURL: origin,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   
  },
})



function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTaskTitle, setInputTaskTitle] = useState("");
  const deferredInput = useDeferredValue(inputTaskTitle);

  const deleteTask = (id: number) => {
    tasks && setTasks(tasks.filter((task) => task.id !== id));
    baseAxios.delete(`${baseUrl}/tasks/${id}`).then(() => reloadTasks());
  };

  const getTasks = async () => {
    return baseAxios
      .get<Task[]>(`${baseUrl}/tasks`)
      .then((res) => res.data).catch((err) => {console.log(err)
        return []
      });
  };
  

  const reloadTasks = () => {
    getTasks().then((tasks) => setTasks(tasks));
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  const addNewTask = async () => {
    if (!deferredInput) return;
    const task: Task = {
      title: deferredInput,
      completed: false,
      id: Math.floor(Math.random() * 1000),
    };
    tasks && setTasks([...tasks, task]);
    setInputTaskTitle("");
    baseAxios.post(`${baseUrl}/tasks`, task).then(() => reloadTasks());
  };

  return (
    <>
      <h1>Tasks</h1>
      <div className="card">
        <input
          style={{ padding: "0.7rem", marginRight: "0.5rem" }}
          onChange={(e) => setInputTaskTitle(e?.target?.value || "")}
          value={inputTaskTitle}
        />
        <button onClick={addNewTask}>Add new task</button>
        {!!tasks.length && tasks.map(({ id, title }) => (
      <p key={id}>
        [{id}] {title} <button onClick={() => deleteTask(id)}>❌</button>
      </p>
    ))}
   
      </div>
    </>
  );
}


export default App;
