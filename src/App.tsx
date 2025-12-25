import { useState } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import type { Task } from './types';


// DONNÉES DE DÉPART
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
  },
  {
    id: crypto.randomUUID(),
    title: 'Write documentation',
    priority: 'low',
    isCompleted: false,
    createdAt: '2025-01-04T10:00:00.000Z'
  },
  {
    id: crypto.randomUUID(),
    title: 'Fix login bug',
    priority: 'high',
    isCompleted: true,
    createdAt: '2025-01-05T10:00:00.000Z'
  }
];


// COMPOSANT PRINCIPAL
export default function App() {
  // STATE : Données 
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // === STATE : Filtres ===
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');

  // ACTIONS 
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

  // FONCTION DE FILTRAGE ET TRI 
  const getDisplayedTasks = (): Task[] => {
    // Accède directement aux states du composant 
    let result = [...tasks];

    // 1. Filtre par recherche (nom de la tâche)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query)
      );
    }

    // 2. Filtre par statut
    if (filterStatus === 'active') {
      result = result.filter(task => !task.isCompleted);
    } else if (filterStatus === 'completed') {
      result = result.filter(task => task.isCompleted);
    }

    // 3. Filtre par priorité
    if (filterPriority !== 'all') {
      result = result.filter(task => task.priority === filterPriority);
    }

    // 4. Tri
    if (sortBy === 'date') {
      result.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'status') {
      result.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    }

    return result;
  };

  // DERIVED STATE 
  const displayedTasks = getDisplayedTasks();
  const completedCount = tasks.filter(task => task.isCompleted).length;

  // AFFICHAGE 
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
          <h2 className="section__title">Filters</h2>
          <TaskFilters
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            filterPriority={filterPriority}
            sortBy={sortBy}
            onSearchChange={setSearchQuery}
            onFilterStatusChange={setFilterStatus}
            onFilterPriorityChange={setFilterPriority}
            onSortByChange={setSortBy}
          />
        </section>

        <section className="section">
          <h2 className="section__title">
            Tasks ({displayedTasks.length}
            {displayedTasks.length !== tasks.length && ` of ${tasks.length}`})
          </h2>
          <TaskList
            tasks={displayedTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  );
}