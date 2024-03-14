import { useState, Suspense } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// const getTasks = async () => {
//   return axios
//     .get<Task[]>("http://localhost:3000/tasks")
//     .then((res) => res.data);
// };

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTaskTitle, setInputTaskTitle] = useState("");

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    // axios.delete(`http://localhost:3000/tasks/${id}`).then(() => reloadTasks());
  };

  // const reloadTasks = () => {
  //   getTasks().then((tasks) => setTasks(tasks));
  // };

  // useEffect(() => {
  //   reloadTasks();
  // }, []);

  const addNewTask = () => {
    if (!inputTaskTitle) return;
    const task: Task = {
      title: inputTaskTitle,
      completed: false,
      id: Math.floor(Math.random() * 1000),
    };
    setTasks([...tasks, task]);
    setInputTaskTitle("");
    // axios.post("http://localhost:3000/tasks", task).then(() => reloadTasks());
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
        <Suspense fallback={<p>Loading...</p>}>
          {tasks.map(({ id, title }) => (
            <p key={id}>
              [{id}] {title} <button onClick={() => deleteTask(id)}>❌</button>
            </p>
          ))}
        </Suspense>
      </div>
    </>
  );
}

export default App;
