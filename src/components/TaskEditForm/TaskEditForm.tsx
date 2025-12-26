import { useState } from "react";
import { Button } from "../Button";
import type { Task } from "../../types";
import "./TaskEditForm.css"

interface TaskEditFormProps {
    // DONNÉES ce qu'on affiche
    task: Task;
    // CALLBACKS actions à exécuter
    onSave: (taskId: string, title: string, priority: "low" | "medium" | "high") => void;
    onCancel: () => void;
}

export function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
    // State LOCAL pour les valeurs du formulaire
    // Initialisé avec les valeurs actuelles de la tâche
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState<"low" | "medium" | "high">(task.priority)

    // Handler pour le titre
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    //Handler pour le priority
    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(event.target.value as "low" | "medium" | "high")
    }

    //handler pour sauvegarder
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()

        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            return;
        }

        onSave(task.id, trimmedTitle, priority)

    }

    //handle Cancel 
    const handleCancel = () => {
        onCancel()
    }

    return (
        <form className="task-edit-form" onSubmit={handleSubmit}>
            <div className="task-edit-form__field">
                <label htmlFor={`edit-title-${task.id}`} className="task-edit-form__label">
                    Title
                </label>
                <input
                    type="text"
                    id={`edit-title-${task.id}`}
                    className="task-edit-form__input"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>

            <div className="task-edit-form__field">
                <label htmlFor={`edit-priority-${task.id}`} className="task-edit-form__label">
                    Priority
                </label>
                <select
                    id={`edit-priority-${task.id}`}
                    className="task-edit-form__select"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="task-edit-form__actions">
                <Button type="button" variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={!title.trim()}>
                    Save
                </Button>
            </div>
        </form>
    );
}