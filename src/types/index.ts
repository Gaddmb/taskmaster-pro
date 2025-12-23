// Structure d'une tâche — source unique, importer partout
// Omit<T, 'x'> Tout SAUF x || Pick<T, 'x'>SEULEMENT x
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  dueDate?: string;
  createdAt: string
}