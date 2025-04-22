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