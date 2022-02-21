
const TodoSearch = ({todos,setTodos}) => {
 
  const handleSearch = (e) => {
    const regex = new RegExp('^'+e.target.value);
    const newTodos = todos.filter(item => regex.test(item.info));
    setTodos(newTodos)
    if(e.target.value.length === 0)
     {
    fetch('http://localhost:3001/')
    .then(result => result.json())
    .then(data => setTodos(data))
    .catch(err => console.log(err))
     }
  }


  const handleChoice = (e)=> {
    if(e.target.value === 'newest') {
      const newTodos = [...todos].sort((a,b)=> b.date - a.date);
      setTodos(newTodos);
      }
    else {
      const newTodos = [...todos].sort((a,b)=> a.date - b.date);
      setTodos(newTodos);
    }
    
  }

  return (
    <>
    <h1>What do I need to do today?</h1>
    <div className='search'>
        <div>
            <label htmlFor="search">Search:</label>
            <input type="text" name='search' id='search' size='40' height='30' onChange={handleSearch} />
        </div>
        <div>
        <label htmlFor="order">Order by:</label>
        <select name="" id="order" onChange={handleChoice}>
            <option value="oldest">Oldest to newest</option>
            <option value="newest">Newest to oldest</option>
        </select>
        </div>
    </div>
    </>
  )
}

export default TodoSearch