import { createContext, useContext, useState } from 'react';

const TodosContext = createContext();

export const UseTodosContext = () => {
  return useContext(TodosContext);
};

export const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [shouldFetch, setShoudFetch] = useState(true);

  const getTodoList = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:3001/task').then(response => response.json())
    setTodos(response)
    setLoading(false)
    setShoudFetch(false)
  }

  const createTask = async ({ title, callback }) => {
    setLoading(true)

    await fetch('http://localhost:3001/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    }).then(response => response.json())

    callback()

    setLoading(false)
    setShoudFetch(true)
  }

  const createSubtask = async ({ parent_id, title, callback }) => {
    setLoading(true)

    await fetch('http://localhost:3001/subtask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, todo_id: parent_id })
    }).then(response => response.json())

    callback()

    setLoading(false)
    setShoudFetch(true)
  }

  const updateTaskStatus = async ({ id, status }) => {
    setLoading(true)

    await fetch('http://localhost:3001/task/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(response => response.json())

    setLoading(false)
    setShoudFetch(true)
  }

  const TodosContextObject = {
    todos,
    isLoading,
    shouldFetch,
    getTodoList,
    createTask,
    createSubtask,
    updateTaskStatus,
  }

  return (
    <TodosContext.Provider value={TodosContextObject}>
      {props.children}
    </TodosContext.Provider>
  );
};
