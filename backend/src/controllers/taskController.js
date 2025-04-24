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

export const updateTaskStatus = async(req, res) => {
    try {
        const taskId = req.params.id;
        const taskStatus = req.body.status;
        const updatedStatus = await taskService.updateTaskStatus(taskId, taskStatus);
        if (!updatedStatus) { return res.status(404).json({ message: "Task not found" }); }
        res.status(200).json(updatedStatus);
    } catch (err) {
        console.error("Unable to update task status", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await taskService.deleteTask(taskId);
        if (!deletedTask) { return res.status(404).json({ message: "Task not found" }); }
        res.status(200).json(deletedTask);
    } catch (err) {
        console.error("Unable to delete task", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const searchTasks = async(req, res) => {
    try {
        const searchId = req.params.q;
        const tasks = await taskService.searchTasks(searchId);
        req.status(200).json(tasks);
    } catch (err) {
        console.error("Unable to find task", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}