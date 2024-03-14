export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type TaskCreate = Pick<Task, "title">;

class TaskManager {
  tasks: Task[] = [];

  generateId(): number {
    return Math.floor(Math.random() * 1000);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: TaskCreate): void {
    console.log("Adding task", task);
    this.tasks.push({
      title: task.title,
      completed: false,
      id: this.generateId(),
    });
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }
}

export const taskManager = new TaskManager();
