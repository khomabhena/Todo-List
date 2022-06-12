
import './App.css';
import TodoList from './TodoList';
import React, { useState, useRef, useEffect } from 'react';
import {v4 as uuid4} from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const fileInput = useRef();
  const LOCALKEY = 'todoaAoo.todos';
  //React.createRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCALKEY));
    if(storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALKEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearTodo() {
    const newTodo = [...todos];
    setTodos(newTodo.filter(todo => !todo.complete));
  }

  function handleAddTodo(e) {
      const name = todoNameRef.current.value;
      if (name === '') return;
      setTodos(prevoTodos => {
        return [...prevoTodos, { id: uuid4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null;
  }

  function handleAddTodoFile() {
      const name = fileInput.current.files[0].name;
      if (name === '') return;
      setTodos(prevoTodos => {
        return [...prevoTodos, { id: uuid4(), name: name, complete: false}]
      })
      fileInput.current.files[0].value = null;
  }

  //let langs = ["RRuby", "ES7", "Scalew"];
  return (
    // <div>
    //   {langs.map(it =>
    //     <p>{it}</p>
    //   )}
    // </div>
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <input type="file" ref={fileInput} />
      <button onClick={handleAddTodoFile}>Add File</button>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={clearTodo}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>      
    </>
  );
}

export default App;
