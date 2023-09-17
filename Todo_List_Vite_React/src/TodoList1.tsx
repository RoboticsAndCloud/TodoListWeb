import React, { useState } from "react";

interface item {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
}
export const TodoList1: React.FC = () => {

    const [todos, setTodos] = useState<item[]>([
        {id:1, text: "Learn React", completed: false, isEditing: false},
        {id:2, text: "Learn Python", completed: false, isEditing: false},
    ]);

    const [input, setInput] = useState("");

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, completed: !todo.completed};
                }
                return todo;
            })
        );
    };

    const handleAdd = () => {
        if (input.length === 0) {
            return
        }
        const newTodo: item = {id: Date.now(), text: input, completed: false, isEditing: false}
        setTodos([...todos, newTodo])
    }

    return ( 
        <div className="main-container">
            <h1>Todo list</h1>

            <ul>
                {
                    todos.map((todo) => (
                        <li 
                        key={todo.id}
                        onClick={()=> toggleComplete(todo.id)}
                        style={{ textDecoration: todo.completed ? "line-through" :" none"}}
                        >
                            {todo.text}
                        </li>
                        
                    )
                    )
                }
            </ul>
            <input 
            type="text" 
            placeholder="Input the todo item"
            onChange={(e) => setInput(e.currentTarget.value)} />
            <button onClick={handleAdd} className="todo-btn">Add Task</button>
        </div>
    )
}