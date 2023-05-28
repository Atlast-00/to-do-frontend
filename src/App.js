import './App.css';
import { useEffect, useState } from 'react';
import Button from './components/Button'
import TaskList from './components/TaskList'
import { UseTodosContext } from './context'

function App() {
  const { todos, isLoading, shouldFetch, getTodoList, createTask } = UseTodosContext()

  const [title, setTitle] = useState('') 

  const handleChangeText = (event) => {
    setTitle(event.target.value)
  }

  const handleClick = async (event) => {
    createTask({ title, callback: () => setTitle('') })
  }

  useEffect(() => {
    if (shouldFetch) {
      getTodoList()
    }

  }, [getTodoList, shouldFetch])

  return (
    <div className="App">
      <div className="container">
        <h1> Todo App </h1>
        <div className="mt-4">
          <input placeholder="What to do ?" disabled={isLoading} className="mr-4" type="text" style={{ border: '1px solid black' }} value={title} onChange={handleChangeText} />
          <Button name="New List" onClick={handleClick} disabled={!title || isLoading} />
        </div>
        <div className="mt-4">
          <TaskList data={todos} />
        </div>
      </div>
    </div>
  );
}

export default App;
