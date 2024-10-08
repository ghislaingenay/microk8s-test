import { serve } from "@hono/node-server";
import { Context, Env, Hono } from "hono";
import * as dotenv from "dotenv";
import { cors } from "hono/cors";
import { TaskCreate, taskManager } from "./TaskManager";
import { BlankInput } from "hono/types";

dotenv.config();

const app = new Hono();

const isDevelopment = process.env.NODE_ENV === "development";
const origin = isDevelopment
  ? "http://localhost:5173"
  : ["https://mk.redicoding.com", "https://www.mk.redicoding.com"];

app.use(
  "*",
  cors({
    origin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

const checkAuth = (c: Context<Env, "/", BlankInput>) => {
  const accessToken = process.env.ACCESS_TOKEN;
  if (!accessToken) throw new Error("ACCESS_TOKEN is not set");
  if (c.req.header("Authorization") !== `Bearer ${accessToken}`) {
    throw new Error("Unauthorized");
  }
};

app.get("/tasks", (c) => {
  checkAuth(c);
  const tasks = taskManager.getTasks();
  return c.json(tasks);
});

app.post("/tasks", async (c) => {
  checkAuth(c);
  const body = await c.req.json<TaskCreate>();
  taskManager.addTask(body);
  return c.json({ message: "Task added", data: body });
});

app.delete("/tasks/:id", (c) => {
  checkAuth(c);
  const id = Number(c.req.param("id"));
  taskManager.deleteTask(id);
  return c.json({ message: "Task deleted" });
});

app.all("*", (c) => {
  return c.json({ message: "Not Valid path" }, 404);
});

const port = 8000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
