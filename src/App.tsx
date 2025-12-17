import { useState } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { TaskCard } from './components/TaskCard';
import type { Task } from './types';

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Learn React basics',
    description: 'Complete lessons 1-10 of the React course',
    priority: 'high',
    isCompleted: true,
    dueDate: '2025-01-15'
  },
  {
    id: 2,
    title: 'Build TaskMaster Pro',
    description: 'Create a full-stack task management application',
    priority: 'high',
    isCompleted: false,
    dueDate: '2025-02-28'
  },
  {
    id: 3,
    title: 'Review TypeScript',
    priority: 'medium',
    isCompleted: false
  }
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggleComplete = (taskId: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const completedCount = tasks.filter(task => task.isCompleted).length;

  return (
    <div>
      <Header 
        title="TaskMaster Pro" 
        subtitle={`${completedCount}/${tasks.length} tasks completed`} 
      />
      
      <main style={{ padding: '2rem', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <TaskCard
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  isCompleted={task.isCompleted}
                  dueDate={task.dueDate}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button 
                  variant="secondary" 
                  onClick={() => handleToggleComplete(task.id)}
                >
                  {task.isCompleted ? 'Undo' : 'Done'}
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>
            No tasks yet. Add your first task!
          </p>
        )}
      </main>
    </div>
  );
}
