const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Mongoose Schemas
const taskSchema = new mongoose.Schema({
    courseId: String,
    taskName: String,
    dueDate: Date,
    details: String
});

const Task = mongoose.model('Task', taskSchema);

// Route to retrieve tasks by course ID
app.get('/courses/:courseId/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({ courseId: req.params.courseId });
        if (tasks.length > 0) {
            res.json(tasks);
        } else {
            res.status(404).json({ message: 'No tasks found for this course' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
});

// Route to add a new task
app.post('/addTask', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add task', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
