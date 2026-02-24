'use client';
import React, { useState } from 'react';
import styles from './test.module.css';

// Your Test Starts Here

type Task = {
    id: number;
    title: string;
    priority: string;
    completed: boolean;
};

export default function TaskManager(){
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState('');

    const addTask = () => {
        if (title.trim() === '') {
            setError('Title cannot be empty.');
            return;
        }

        setError('');

        const newTask: Task = {
            id: Date.now(),
            title: title,
            priority: priority,
            completed: false
        };

        // New tasks go on top
        setTasks([newTask, ...tasks]);

        setTitle('');
    };

    const toggleTask = (id: number) => {

        const updated = tasks.map((task) => {

            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }

            return task;
        }
    );

        setTasks(updated);
    };

    const deleteTask = (id: number) => {
        const updated = tasks.filter((task) => task.id !== id);

        setTasks(updated);
    };

    // Filter logic 
    let displayedTasks = tasks;

    if (filter === 'Active') {
        displayedTasks = tasks.filter((task) => !task.completed);

    }

    if (filter === 'Completed')
         {
        displayedTasks = tasks.filter((task) => task.completed);
    }

    // Make sure completed tasks appear below active ones
    const activeTasks = displayedTasks.filter((t) => !t.completed);
    const completedTasks = displayedTasks.filter((t) => t.completed);
    displayedTasks = [...activeTasks, ...completedTasks];

    return (
        <div className={styles.container}>
            <h2>Task Manager</h2>

        <div>
          <input
                type="text"
                value={title}
                 placeholder="Task title"
                onChange={(e) => {
                 setTitle(e.target.value);
                setError('');
                    }
                    }/>

        <select
         value={priority} onChange={(e) => setPriority(e.target.value)}>

        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
            </select>

         <button onClick={addTask}>Add</button>
         </div>

        {error && <p className={styles.error}>{error}</p>}

    <div className={styles.filters}>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
            </div>

    <ul>
    {displayedTasks.length === 0 && <p>No tasks.</p>}

    {displayedTasks.map((task) => (
            <li key={task.id} className={task.completed ? styles.completed : ''}>
            <input type="checkbox" checked={task.completed}
 
    onChange={() => toggleTask(task.id)}
     />

    {task.title} ({task.priority})

     <button onClick={() => deleteTask(task.id)}>
         Delete
    </button>
                </li>
        )
        )}
         </ul>
</div>
 )}