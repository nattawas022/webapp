'use client'

import { useState } from "react"
import { Pencil, SquareX } from "lucide-react" // npm i lucide-react --save-dev

export default function Todo() {

    const [todos, setTodos] = useState([
        { id: 1, title: 'Writing Next.js', complete: true },
        { id: 2, title: 'Do homework', complete: false },
        { id: 3, title: 'Sleeping', complete: true },
    ])

    const [task, setTask] = useState('')
    const [editId, setEditId] = useState(-1)

    const addTask = () => {
        if (!task) return
        const newTask = {
            id:  todos[todos.length-1].id  + 1,
            title: task,
            complete: false
        }
        setTodos([...todos, newTask])
        setTask('')
    }

    const deleteTask = (id: number) => {
        console.log("Id: ", id)
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }

    const editTask = (id: number) => {
        setEditId(id)
    }

    const updateTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodos([
            ...todos.map( (todo) => {
                if (todo.id === editId) {
                    return {
                        ...todo,
                        title: e.target.value
                    }
                }
                return todo
            } )
        ])
    }

    return (<div className="border-2 max-w-lg border-gray-300 rounded-lg mx-auto p-4">
        <h1 className="text-xl font-bold">Todo</h1>
       
        <h2>EditId: {editId} </h2>
        
        <div>
            <ul>
                {todos.map( (todo,index) => (
                    <li key={todo.id} className="flex items-center gap-4 border-b-2 border-gray-300 p-2">
                        <span>{index+1}. </span>
                        
                        {
                           (editId === todo.id) ? (
                             <input 
                                className="border-2 border-gray-300 rounded-lg px-2"
                                type="text" 
                                value={todo.title}
                                onChange={ (e) => updateTask(e)} 
                                />
                           ):
                           (<span>{todo.title}</span>) 
                        }
                        
                        



                        <input
                            className="mr-8"
                            type="checkbox"
                            defaultChecked={todo.complete} /> 
                        <SquareX
                            onClick={() => deleteTask(todo.id)}
                            />
                        <Pencil 
                            onClick={ () => editTask(todo.id) }
                            /> 
                    </li>
                ))}
            </ul>

            <input
                className="border-2 border-gray-300 rounded-lg p-2 m-2"
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="Add a new todo" />

            <button
                onClick={addTask}
                className="border-2 border-gray-300 rounded-lg p-2 m-2 bg-blue-500 text-white"
            >Add</button>
        </div>
    </div>)
}