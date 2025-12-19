import { useState } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task } from './types';

const initialTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: 'Learn React basics',
    description: 'Complete lessons 1-10 of the React course',
    priority: 'high',
    isCompleted: true,
    dueDate: '2025-01-15',
    createdAt: '2025-01-01T10:00:00.000Z'
  },
  {
    id: crypto.randomUUID(),
    title: 'Build TaskMaster Pro',
    description: 'Create a full-stack task management application',
    priority: 'high',
    isCompleted: false,
    dueDate: '2025-02-28',
    createdAt: '2025-01-02T10:00:00.000Z'
  },
  {
    id: crypto.randomUUID(),
    title: 'Review TypeScript',
    priority: 'medium',
    isCompleted: false,
    createdAt: '2025-01-03T10:00:00.000Z'
  }
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (title: string, priority: 'low' | 'medium' | 'high') => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const completedCount = tasks.filter(task => task.isCompleted).length;

  return (
    <div>
      <Header
        title="TaskMaster Pro"
        subtitle={`${completedCount}/${tasks.length} tasks completed`}
      />

      <main className="main">
        <section className="section">
          <h2 className="section__title">Add New Task</h2>
          <TaskForm onAddTask={handleAddTask} />
        </section>

        <section className="section">
          <h2 className="section__title">Tasks ({tasks.length})</h2>
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  );
}