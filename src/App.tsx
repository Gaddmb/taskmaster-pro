import { Header } from './components/Header'
import { Button } from './components/Button'

function App() {
  const handleClick = () =>{
    console.log("button clicked!");
    
  }
  return (
    <div>
      <Header title="TaskMaster Pro" subtitle="Manage your tasks efficiently" />
      <main style={{ padding: '2rem' }} >
        <Button onClick={handleClick}>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="danger">Danger Button</Button>
        <Button disabled>Disabled Button</Button>
      </main>
    </div>
  );
}

export default App;