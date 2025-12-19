import { Button } from '../Button';
import { TaskCard } from '../TaskCard';
import type{ Task } from '../../types';
import './TaskList.css';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="task-list__empty">
                <p>No tasks yet. Add your first task above!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-list__item">
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
                </div>
            ))}
        </div>
    );
}