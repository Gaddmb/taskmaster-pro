import { Header } from './components/Header'
import { TaskCard } from './components/TaskCard';

function App() {
  
  return (
    <div>
      <Header title="TaskMaster Pro" subtitle="Manage your tasks efficiently" />
      <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px'}} >
       <TaskCard
          title="Learn React basics"
          description="Complete lessons 1-10 of the React course"
          priority="high"
          isCompleted={true}
          dueDate="2025-01-15"
        />
        
        <TaskCard
          title="Build TaskMaster Pro"
          description="Create a full-stack task management application"
          priority="high"
          isCompleted={false}
          dueDate="2025-02-28"
        />
        
        <TaskCard
          title="Review TypeScript"
          priority="medium"
          isCompleted={false}
        />
        
        <TaskCard
          title="Take a break"
          description="Don't forget to rest!"
          priority="low"
          isCompleted={false}
        />
      
      </main>
    </div>
  );
}

export default App;