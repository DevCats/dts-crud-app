import * as taskService from "../services/taskService.js";

export const getTasks = async(req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.error("Unable to fetch tasks", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getTaskById = async(req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.getTaskById(taskId);
        res.status(200).json(task);
    } catch (err) {
        console.error("Unable to fetch task", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createTask = async(req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(200).json(newTask);
    } catch (err) {
        console.error("Unable to create task", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}