import './TaskFilters.css';

interface TaskFiltersProps {
    // valeur actuelle 
    searchQuery: string;
    filterStatus: 'all' | 'active' | 'completed';
    filterPriority: 'all' | 'low' | 'medium' | 'high';
    sortBy: 'date' | 'priority' | 'status';
    // props de callback
    onSearchChange: (query: string) => void;
    onFilterStatusChange: (status: 'all' | 'active' | 'completed') => void;
    onFilterPriorityChange: (priority: 'all' | 'low' | 'medium' | 'high') => void;
    onSortByChange: (sortBy: 'date' | 'priority' | 'status') => void;
}

export function TaskFilters({
    searchQuery,
    filterStatus,
    filterPriority,
    sortBy,
    onSearchChange,
    onFilterStatusChange,
    onFilterPriorityChange,
    onSortByChange
}: TaskFiltersProps) {

    // Handlers pour chaque select
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterStatusChange(event.target.value as 'all' | 'active' | 'completed');
    };

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterPriorityChange(event.target.value as 'all' | 'low' | 'medium' | 'high');
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSortByChange(event.target.value as 'date' | 'priority' | 'status');
    };

    return (
        <div className="task-filters">

            {/* Barre de recherche */}
            <div className="task-filters__field">
                <label htmlFor="search" className="task-filters__label">
                    Search
                </label>
                <input
                    type="text"
                    id="search"
                    className="task-filters__input"
                    placeholder="Search tasks by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Ligne avec les 3 selects */}
            <div className="task-filters__row">

                {/* Filtre par statut */}
                <div className="task-filters__field">
                    <label htmlFor="status" className="task-filters__label">
                        Status
                    </label>
                    <select
                        id="status"
                        className="task-filters__select"
                        value={filterStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Filtre par priorité */}
                <div className="task-filters__field">
                    <label htmlFor="priority" className="task-filters__label">
                        Priority
                    </label>
                    <select
                        id="priority"
                        className="task-filters__select"
                        value={filterPriority}
                        onChange={handlePriorityChange}
                    >
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                {/* Tri */}
                <div className="task-filters__field">
                    <label htmlFor="sortBy" className="task-filters__label">
                        Sort by
                    </label>
                    <select
                        id="sortBy"
                        className="task-filters__select"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="date">Date</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>

            </div>
        </div>
    );
}