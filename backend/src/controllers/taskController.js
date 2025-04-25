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
        if (!task) { return res.status(404).json({ message: "Task not found" }); }
    } catch (err) {
        console.error("Unable to fetch task", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createTask = async(req, res) => {
    try {
        const taskData = req.body;
        if (!["Not Started", "In Progress", "Stuck", "Complete"].includes(taskData.status)) {
            return res.status(400).json({ message: "Bad Request" });
        }
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
        if (!["Not Started", "In Progress", "Stuck", "Complete"].includes(taskStatus)) {
            return res.status(400).json({ message: "Bad Request" });
        }
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