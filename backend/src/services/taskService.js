import { query } from "../db.js";

export const getTasks = async() => {
    const { rows } = await query(`SELECT * FROM tasks_tb`);
    return rows;
}