import { getTaskById, updateTask, deleteTask } from '../../../lib/tasks';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const task = getTaskById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } else if (req.method === 'PUT') {
    const { title, completed } = req.body;
    updateTask(id, { id, title, completed });
    res.status(200).json({ id, title, completed });
  } else if (req.method === 'DELETE') {
    deleteTask(id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
