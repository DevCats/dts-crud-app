import express from "express";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTaskStatus);
router.delete("/tasks/:id", taskController.deleteTask);
router.get("/tasks/search", taskController.searchTasks);

export default router;