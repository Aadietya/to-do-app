// import { useState } from "react";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { text: "Learn React", done: false },
          { text: "Walk the dog", done: false },
        ];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, done: false }]);
    setNewTodo("");
  };

  const handleDelete = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  const handleToggle = (indexToToggle) => {
    setTodos(
      todos.map((todo, index) =>
        index === indexToToggle ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>My To-Do App</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />

      <button onClick={handleAdd}>Add</button>
      <button onClick={handleClearCompleted}>Clear Completed</button>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => handleToggle(index)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text} <button onClick={() => handleDelete(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
