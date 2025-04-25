import { query } from "../db.js";

// Fetches all tasks
export const getTasks = async() => {
    const { rows } = await query(`SELECT * FROM tasks_tb`);
    return rows;
}

// Fetches a task by ID
export const getTaskById = async(_taskId) => {
    const { rows } = await query(`SELECT * FROM tasks_tb WHERE id=$1`, [_taskId]);
    return rows[0];
}

// Creates a task
export const createTask = async(_taskData) => {
    const { title, description='', status, due } = _taskData;
    const { rows } = await query(
        `INSERT INTO tasks_tb (title, description, status, due)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, description, status, due]
    );
    return rows[0];
}

// Updates the status of a task
export const updateTaskStatus = async(_taskId, _taskStatus) => {
    const { rows } = await query(
        `UPDATE tasks_tb SET status=$1 WHERE id=$2 RETURNING *`,
        [_taskStatus, _taskId]
    );
    return rows[0];
}

// Deletes a task
export const deleteTask = async(_taskId) => {
    const { rowCount } = await query(`DELETE FROM tasks_tb WHERE id=$1 RETURNING *`, [_taskId]);
    return rowCount > 0;
}