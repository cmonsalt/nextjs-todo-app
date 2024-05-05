import React, { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const handleDelete = async (id) => {
    await fetch(`/api/task/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleCompleted = async (t) => {
    const updatedTask = { ...t, completed: !t.completed };
    const res = await fetch(`/api/task/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    if (res.ok) {
      setTasks(tasks.map((task) => (task.id === t.id ? data : task)));
    } else {
      console.error("Error updating task:", data.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Lista De Tareas</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Añadir nueva tarea"
          className="border rounded-md p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Añadir Tarea
        </button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between border-b py-2"
          >
            <span className={t.completed ? "line-through" : ""}>{t.title}</span>
            <div>
            <button
                onClick={() => handleToggleCompleted(t)}
                className={`px-3 py-1 rounded-md mr-2 ${
                  t.completed ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {t.completed ? "Marcar como Incompleto" : "Marcar como Completo"}
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
