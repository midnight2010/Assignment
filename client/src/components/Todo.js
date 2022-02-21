import {useState,useRef,useEffect} from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({item,handleDelete,handleCheck,handleUpdate}) => {
  const [edit,setEdit] = useState('');
  const inputRef = useRef(null);
  const handleEdit = (e) => {
    setEdit({...edit,info:e.target.value})
  }


  useEffect(()=> {
    if(edit) {
      inputRef.current.focus()
    }
  },[edit])

  const handleUpd = () => {
    handleUpdate(edit)
    setEdit('')
  }

  return (
    <div className={item.completed ? 'todo-row complete' : 'todo-row'}>
          <div className='todo-item'>
            <input type='checkbox' onClick={() => handleCheck(item._id)}></input>
            {edit ? <input type='text' ref={inputRef} onChange={handleEdit}></input> : <p>{item.info}</p>}       
          </div>
          <div className='todo-item'>
            {edit ? <button onClick={handleUpd}>Done</button> : 
            <button onClick={()=>setEdit({info:item.info,id:item._id})}><TiEdit className='edit-icon'/> Edit</button>}
            <button onClick={() => handleDelete(item._id)}><RiCloseCircleLine size='13' className='delete-icon'/>Delete</button>
          </div>
        </div>
  )
}

export default Todo