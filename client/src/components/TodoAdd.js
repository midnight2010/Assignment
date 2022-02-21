import {useState} from 'react'

const TodoAdd = ({onSubmit}) => {
  const [input,setInput] = useState('')

  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({info:input,completed:false,date:Date.now()})

    setInput('')
  }
  return (
    <div className='todo-add'>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
              placeholder='Add a todo'
              name='text'
              className='todo-input'
              value={input}
              onChange={handleChange}
            />
          <button  className='todo-button'>
              Add todo
          </button>
      </form>
    </div>
  )
}

export default TodoAdd