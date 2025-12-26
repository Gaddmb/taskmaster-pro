import { Button } from '../Button';
import { TaskCard } from '../TaskCard';
import { TaskEditForm } from '../TaskEditForm';
import type { Task } from '../../types';
import './TaskList.css';

interface TaskListProps {
    tasks: Task[];
    //  ÉTAT info de context
    editingTaskId: string | null;
    // Actions sur les tâches (CRUD)
    onToggleComplete: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (taskId: string) => void;
    // Actions du formulaire d'édition
    onCancelEdit: () => void;
    onUpdateTask: (taskId: string, title: string, priority: 'low' | 'medium' | 'high') => void;
}

export function TaskList({
    tasks,
    editingTaskId,

    onToggleComplete,
    onDeleteTask,

    onEditTask,
    onCancelEdit,
    onUpdateTask
}: TaskListProps) {

    if (tasks.length === 0) {
        return (
            <div className="task-list__empty">
                <p>No tasks yet. Add your first task above!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => {
                // Est-ce que cette tâche est en mode édition ?
                const isEditing = editingTaskId === task.id;

                return (
                    <div key={task.id} className="task-list__item">
                        {isEditing ? (
                            // MODE ÉDITION : affiche le formulaire
                            <TaskEditForm
                                task={task}
                                onSave={onUpdateTask}
                                onCancel={onCancelEdit}
                            />
                        ) : (
                            // MODE NORMAL : affiche la carte + boutons
                            <>
                                <div className="task-list__card">
                                    <TaskCard
                                        title={task.title}
                                        description={task.description}
                                        priority={task.priority}
                                        isCompleted={task.isCompleted}
                                        dueDate={task.dueDate}
                                    />
                                </div>
                                <div className="task-list__actions">
                                    <Button
                                        variant="secondary"
                                        onClick={() => onEditTask(task.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => onToggleComplete(task.id)}
                                    >
                                        {task.isCompleted ? 'Undo' : 'Done'}
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => onDeleteTask(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
