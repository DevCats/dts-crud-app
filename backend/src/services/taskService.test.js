import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as db from '../db.js';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask,
} from './taskService.js';

vi.mock('../db.js', () => ({
  query: vi.fn()
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('taskService', () => {
  it('getTasks should return all tasks', async () => {
    const mockRows = [
        { id: 1, title: 'Task #1', description: 'Description for task #1', status: 'Not Started', due: '2025-11-01T10:00:00.00Z' }, 
        { id: 2, title: 'Task #2', description: 'Description for task #2', status: 'Complete', due: '2025-12-01T10:00:00.00Z' }
    ];
    db.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await getTasks();

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM tasks_tb');
    expect(result).toEqual(mockRows);
  });

  it('getTaskById should return the task with the given ID', async () => {
    const mockRow = { id: 1, title: 'Task #1', description: 'Description for task #1', status: 'Not Started', due: '2025-11-01T10:00:00.00Z' };
    db.query.mockResolvedValueOnce({ rows: [mockRow] });

    const result = await getTaskById(1);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM tasks_tb WHERE id=$1', [1]);
    expect(result).toEqual(mockRow);
  });

  it('createTask should insert and return the new task', async () => {
    const newTask = { title: 'Task #3', description: 'Description for task #3', status: 'Not Started', due: '2025-10-01T10:00:00.00Z' };
    const insertedTask = { id: 3, ...newTask };
    db.query.mockResolvedValueOnce({ rows: [insertedTask] });

    const result = await createTask(newTask);

    expect(db.query).toHaveBeenCalledWith(
      `INSERT INTO tasks_tb (title, description, status, due)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [newTask.title, newTask.description, newTask.status, newTask.due]
    );
    expect(result).toEqual(insertedTask);
  });

  it('updateTaskStatus should update and return the updated task', async () => {
    const updatedTask = { id: 1, status: 'Complete' };
    db.query.mockResolvedValueOnce({ rows: [updatedTask] });

    const result = await updateTaskStatus(1, 'Complete');

    expect(db.query).toHaveBeenCalledWith(
      `UPDATE tasks_tb SET status=$1 WHERE id=$2 RETURNING *`,
      ['Complete', 1]
    );
    expect(result).toEqual(updatedTask);
  });

  it('deleteTask should return true if a task is deleted', async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    const result = await deleteTask(1);

    expect(db.query).toHaveBeenCalledWith(
      `DELETE FROM tasks_tb WHERE id=$1 RETURNING *`,
      [1]
    );
    expect(result).toBe(true);
  });

  it('deleteTask should return false if no task is deleted', async () => {
    db.query.mockResolvedValueOnce({ rowCount: 0 });

    const result = await deleteTask(99);

    expect(db.query).toHaveBeenCalledWith(
      `DELETE FROM tasks_tb WHERE id=$1 RETURNING *`,
      [99]
    );
    expect(result).toBe(false);
  });
});