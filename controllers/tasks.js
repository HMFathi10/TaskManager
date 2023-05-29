const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(201).json({ tasks })
});

const createTask = asyncWrapper(async (req, res) => {
    const { title, completed } = req.body;
    const newTask = await Task.create({ title, completed })
    res.status(201).json(req.body);
});

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID }, { useFindAndModify: false })
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true, useFindAndModify: false })
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
});


module.exports = { getAllTasks, createTask, getTask, deleteTask, updateTask }