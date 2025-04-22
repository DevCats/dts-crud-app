import { query } from "../db.js";

export const getTasks = async() => {
    const { rows } = await query(`SELECT * FROM tasks_tb`);
    return rows;
}

export const getTaskById = async(_taskId) => {
    const { rows } = await query(`SELECT * FROM tasks_tb WHERE id=$1`, [_taskId]);
    return rows[0];
}