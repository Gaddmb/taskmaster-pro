import "./TaskCard.css"

interface TaskCardProps {
    title: string
    description?: string;
    priority: "low" | "medium" | "high";
    isCompleted: boolean
    dueDate?: string
}

export function TaskCard({ title, description, priority, isCompleted, dueDate }: TaskCardProps) {
    // Early return si pas de titre (sécurité)
    if (!title) {
        return null
    }

    const priorityLabels = {
        low: "Low",
        medium: "Medium",
        high: "High"
    };
    return (
        <article className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}>
            <div className="task-card__header">
                <h3 className="task-card__title">{title}</h3>
                <span className={`task-card__priority task-card__priority--${priority}`}>
                    {priorityLabels[priority]}
                </span>
            </div>
            {description && (<p className="task-card__description">{description}</p>)}

            <div className="task--card__footer">
                {dueDate && (
                    <span className="task-card__due-date"> Due: {dueDate}</span>
                )}

                <span className="task-card__status">
                    {isCompleted ? "Completede" : "O Pending"}
                </span>
            </div>
        </article>
    )
}