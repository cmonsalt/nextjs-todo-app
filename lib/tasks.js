let tasks = [];

export function getTasks() {
  return tasks;
}

export function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

export function addTask(task) {
  tasks.push(task);
}

export function updateTask(id, updatedTask) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = updatedTask;
  }
}

export function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
}
