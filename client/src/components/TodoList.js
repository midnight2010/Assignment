
import { useState,useEffect } from 'react'
import TodoAdd from './TodoAdd'
import Todo from './Todo'
import TodoSearch from './TodoSearch'
import bigFetch from '../fetch'

const TodoList = () => {
  const [todos,setTodos] = useState([]);


  const addTodo = todo => {
    if(!todo.info) return;
    bigFetch('add',todo)
    .then(result => result.json())
    .then(data => {
      const newTodos = [...todos,data];
      setTodos(newTodos)
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    bigFetch('delete',{id})
    setTodos(todos.filter(item => item._id !== id))
    
}

  const handleCheck = (id) => {
    let updatedTodos = todos.map(item => {
      if (item._id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodos(updatedTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter(item => !item.completed);
    bigFetch('clear',todos)
    setTodos(newTodos);

  }

  const handleUpdate = (edit) => {
    const newTodos = todos.map(item => item._id === edit.id ? {...item,info:edit.info} : item)
    bigFetch('update',edit)
    setTodos(newTodos)

  }

  useEffect(()=> {
      fetch('http://localhost:3001/')
      .then(result => result.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err))
    
   },[])
   
  return (
  <>
    <TodoSearch todos={todos} setTodos={setTodos}/>
    <TodoAdd onSubmit={addTodo}/>
    <div className='todo-list'>
      <h1>Tasks to complete</h1>
      {todos.map((item) => (
         <Todo key={item._id} item={item} handleDelete={handleDelete} handleCheck={handleCheck} handleUpdate={handleUpdate}/>
      ))
      }
      <button className='todo-button' onClick={handleClear}>Clear checked items</button>
    </div>
  </>
  )
}

export default TodoList