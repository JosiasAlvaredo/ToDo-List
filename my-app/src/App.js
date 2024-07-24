import React, { useState } from 'react';
import './App.css';

const categories = ["Estudio", "Hogar", "Ocio", "Otro"];

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ text: '', category: 'Estudio' });
  const [filterCategory, setFilterCategory] = useState('Todas');

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, text: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewTask({ ...newTask, category: e.target.value });
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.text.trim() === '') {
      alert('No puedes poner una tarea invisible porque así no podrás hacerla');
    } else {
      setTasks([...tasks, { text: newTask.text, category: newTask.category }]);
      setNewTask({ text: '', category: 'Estudio' });
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterCategory === 'Todas') {
      return true;
    }
    return task.category === filterCategory;
  });

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <form onSubmit={addTask} className="form">
        <input
          type="text"
          value={newTask.text}
          onChange={handleInputChange}
          placeholder="Ingrese una nueva tarea"
          className="input"
        />
        <select value={newTask.category} onChange={handleCategoryChange} className="select">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" className="button">
          Agregar
        </button>
      </form>
      <div className="filter-container">
        <select value={filterCategory} onChange={handleFilterCategoryChange} className="select">
          <option value="Todas">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="list-container">
        <ol className="list">
          {filteredTasks.map((task, index) => (
            <li key={index}>
              {task.text} ({task.category})
              <span className="delete-button" onClick={() => removeTask(index)}>×</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TodoList;