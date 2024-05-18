// app/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createTask } from "./serverActions"; // Adjust the path as needed

export default function Home() {
  const [todo, setToDo] = useState([]);
  const [newToDo, setNewToDo] = useState('');

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9999);
  };

  const handleKeyUp = (key) => {
    if (key === 'Enter' && newToDo) {
      const randomNumber = getRandomNumber();
      const newItem = {
        id: `item-${randomNumber}`,
        content: newToDo,
      };

      setToDo([...todo, newItem]);
      setNewToDo('');
    }
  };

  const handleSubmit = async () => {
    const randomNumber = getRandomNumber();
    const newItem = {
      id: `item-${randomNumber}`,
      content: newToDo,
    };

    setToDo([...todo, newItem]);
    setNewToDo('');

    // Create a FormData object and append the new task
    const data = new FormData();
    data.append("task", newToDo);

    // Call the server action to create the task
    await createTask(data);

    // Redirect or handle after task creation
    
  };

  const handleDelete = (index) => {
    const newTodoList = todo.filter((_, i) => i !== index);
    setToDo(newTodoList);
  };

  return (
    <main>
      <div className="flex justify-center pt-40">
        <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl">
          <div className="w-full p-3">
            <p className="text-3xl text-gray-600 text-center">Todo List</p>
          </div>
          <div className="relative mt-10">
            <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </div>
            <input
              type="text"
              id="newTodo"
              value={newToDo}
              onChange={(event) => setNewToDo(event.target.value)}
              onKeyUp={(event) => handleKeyUp(event.key)}
              className="w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white"
              placeholder="Add to To do List"
              name="task"
            />
          </div>
          <ul className="w-full pt-6">
            {todo.map((item, index) => (
              <li key={item.id} className="w-full border-2 rounded-xl mt-2 hover:border-blue-300">
                <input id={index} type="checkbox" className="float-left block w-6 h-6 m-3" />
                <button
                  id={index}
                  onClick={() => handleDelete(index)}
                  className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105"
                >
                  x
                </button>
                <label htmlFor={index} className="block w-full p-3">{item.content}</label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit} className="mt-8 w-20 h-12 rounded-xl bg-red-700 text-gray-200">Add Task</button>
        </div>
      </div>
    </main>
  );
}
