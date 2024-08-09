import React, { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setisCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  
  

  const handleAddTodo = (e) => {
    e.preventDefault()
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
    setNewTitle('');
    setNewDescription('');
  };

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filterdItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filterdItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompleted = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))

    if (saveTodo) {
      setTodos(saveTodo);
    }

    if (saveCompletedTodo) {
      setCompletedTodos(saveCompletedTodo);
    }
  }, [])



  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>

        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the description?" />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primary-btn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`sec-btn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setisCompleteScreen(false)}>Todo</button>

          <button className={`sec-btn ${isCompleteScreen === true && 'active'}`} onClick={() => setisCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDelete(index)} />
                  <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            )
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><i>Completed on:{item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon'
                    onClick={() => handleDeleteCompleted(index)} />
                </div>
              </div>
            )
          })}
        </div>

      </div>

    </div>
  );
}

export default App;
