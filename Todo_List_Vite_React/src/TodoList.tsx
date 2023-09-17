import React, { useState } from "react";
import { EditTodoForm, Todo } from "./Todo";

interface item {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
}
export const TodoList: React.FC = () => {

    const [todos, setTodos] = useState<item[]>([
        {id:1, text: "Learn React", completed: false, isEditing: false},
        {id:2, text: "Learn Python", completed: false, isEditing: false},
    ]);

    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.length === 0) {
            return
        }
        const newTodo: item = {id: Date.now(), text: input, completed: false, isEditing: false}
        setTodos([...todos, newTodo])
    }


    const deleteTodo = (id: number) => { 
        setTodos(todos.filter((todo) => todo.id !== id)) 
    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, completed: !todo.completed};
                }
                return todo;
            })
        );
    }
  
    const editTodo = (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
  
    const editTask = (value: string, id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: value, isEditing: !todo.isEditing } : todo
        )
      );
    };

    return ( 
        <div className="main-container">
            <h1>Todo List</h1>
            <input 
            type="text" 
            placeholder="Input the todo item"
            onChange={(e) => setInput(e.currentTarget.value)} />
            <button onClick={handleAdd} className="todo-btn">Add Task</button>

            {
                todos.map((todo) => (
                    todo.isEditing ? (
                    <EditTodoForm editTodoTask={editTask} task={todo} />
                      ) : (
                    <Todo
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    toggleComplete={toggleComplete}
                    />
                )
                ))
            }

        </div>
    )
}