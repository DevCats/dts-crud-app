import express from "express";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTaskStatus);

export default router;