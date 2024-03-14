import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { TaskCreate, taskManager } from "./TaskManager";

const app = new Hono();

app.get("/", (c) => {
  const tasks = taskManager.getTasks();
  return c.json(tasks);
});

app.post("/", async (c) => {
  const body = await c.req.json<TaskCreate>();
  taskManager.addTask(body);
  return c.json({ message: "Task added", data: body });
});

app.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  taskManager.deleteTask(id);
  return c.json({ message: "Task deleted" });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
