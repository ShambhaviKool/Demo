const express = require('express');
const app = express();
​
app.use(express.json());
​
// Sample data
let tasks = [
    {
        id: 1,
        title: 'Task 1',
        description: 'This is task 1',
        done: false
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'This is task 2',
        done: false
    }
];
​
// GET method to retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json({tasks});
});
​
// GET method to retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({error: 'Task not found'});
    } else {
        res.json({task});
    }
});
​
// POST method to add a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        res.status(400).json({error: 'The title is missing'});
    } else {
        const newTask = {
            id: tasks.length + 1,
            title,
            description: description || '',
            done: false
        };
        tasks.push(newTask);
        res.status(201).json({task: newTask});
    }
});
​
// PUT method to update a task by ID
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({error: 'Task not found'});
    } else {
        const { title, description, done } = req.body;
        task.title = title || task.title;
        task.description = description || task.description;
        task.done = done || task.done;
        res.json({task});
    }
});
​
// DELETE method to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        res.status(404).json({error: 'Task not found'});
    } else {
        tasks.splice(taskIndex, 1);
        res.json({result: true});
    }
});
​
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});