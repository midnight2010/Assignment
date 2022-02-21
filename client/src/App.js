
import './App.css';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';
import TodoSearch from './components/TodoSearch';


function App() {
  return (
    <div className='todo-app'>
      <TodoList/>
    </div>
  );
}

export default App;
