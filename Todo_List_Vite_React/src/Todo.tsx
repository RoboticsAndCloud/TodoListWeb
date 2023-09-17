import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";

// Check the fontawesom
// https://fontawesome.com/docs/web/use-with/react/

interface item {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
}

interface TodoProps {
    task: item;
    deleteTodo: (id: number) => void;
    editTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
}

interface EditTodoProps {
    task: item;
    editTodoTask: (value: string, id: number) => void;
   
}

export const Todo = ({task, deleteTodo, editTodo, toggleComplete} : TodoProps) => {

    return (
      <div className="Todo">
          <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.text}</p>
          <div>
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
          </div>
      </div>
    )
  }

export const EditTodoForm = ({editTodoTask, task}: EditTodoProps) => {
    const [value, setValue] = useState(task.text);

    const handleSubmit = (e: any) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editTodoTask(value, task.id);

        window.alert("Update: "+ value)
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
    <button type="submit" className='todo-btn'>Update Task</button>
  </form>
  )
}

