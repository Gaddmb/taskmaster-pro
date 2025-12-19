import { useState } from "react";
import { Button } from "../Button"
import './TaskForm.css'

interface TaskFormProps {
    onAddTask: (title: string, priority: 'low' | 'medium' | 'high') => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
    // LOGIQUE
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validation simple
        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            return
        }

        // Appelle la fonction du parent
        onAddTask(trimmedTitle, priority)

        // Reset le formulaire 
        setTitle('')
        setPriority('medium')

    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(event.target.value as 'low' | 'medium' | 'high');
    }

    //AFFICHAGE

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__field">
                <label htmlFor='title' className="task-form__label">
                    Task title
                </label>

                < input
                    type="texte"
                    id="title"
                    className="task-form__input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="What needs to be done?" />
            </div>

            <div className="task-form__field">
                <label htmlFor="priority" className="task-form__label">
                    Priority
                </label>
                <select id="priority" className="task-form__select"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            </div>

            <Button type="submit" disabled={!title.trim()}>Add Task</Button>
        </form>
    )
}