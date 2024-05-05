import { getTasks, addTask } from '../../lib/tasks';

export default function handler(req, res) {
    console.log(getTasks)
  if (req.method === 'GET') {
    const tasks = getTasks();
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const newTask = { id: Date.now(), title, completed: false };
    addTask(newTask);
    res.status(201).json(newTask);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
