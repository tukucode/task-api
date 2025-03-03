import { z } from 'zod';
import { Task } from '../types/task';
import { tasks } from '../db/data';
import { sendResponse, validateRequestBody } from '../lib/utils';
import type { Request, Response } from 'express';

const taskSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    completed: z.boolean()
});

/**
 * Middleware untuk membuat task baru.
 * @param {taskSchema} schema - Objek schema yang merujuk untuk validation req body sebagai parameter pada middleware.
 * @param {Request} req - Objek request dari Express.
 * @param {Response} res - Objek response dari Express.
 * @returns {Response} - Response dengan task yang baru dibuat.
 */
export const newTask = [
    validateRequestBody(taskSchema), 
    (req: Request, res: Response) => {
        const task: Task = {
            id: tasks.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };

        tasks.push(task);
        return sendResponse<Task>(res, 201, "Success create task", task);
    }
];

/**
 * Mengembalikan daftar semua task yang ada.
 * @param {Request} req - Objek request dari Express.
 * @param {Response} res - Objek response dari Express.
 */
export const listTask = (req: Request, res: Response) => {
    sendResponse<Task[]>(res, 200, "Success", tasks);
};

/**
 * Mengembalikan detail dari task tertentu berdasarkan ID.
 * @param {Request} req - Objek request dari Express.
 * @param {Response} res - Objek response dari Express.
 */
export const detailTask = (req: Request, res: Response) => {
    const task = tasks.find((data) => data.id === parseInt(req.params.id));

    if (!task) {
        return sendResponse(res, 400, "Invalid task ID", null);
    }

    sendResponse<Task>(res, 200, "Success", task);
};

const completedSchema = z.object({
    completed: z.boolean()
});

/**
 * Middleware untuk memperbarui status completed dari task.
 * @param {completedSchema} schema - Objek schema yang merujuk untuk validation req body sebagai parameter pada middleware.
 * @param {Request} req - Objek request dari Express.
 * @param {Response} res - Objek response dari Express.
 * @returns {Response} - Response setelah memperbarui status task.
 */
export const completedTask = [
    validateRequestBody(completedSchema), 
    (req: Request, res: Response) => {
        const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));

        if (index === -1) {
            return sendResponse(res, 400, "Invalid task ID", null);
        }

        tasks[index] = { ...tasks[index], completed: req.body.completed };

        sendResponse(res, 200, "Update task completed", tasks[index]);
    }
];

/**
 * Menghapus task berdasarkan ID.
 * @param {Request} req - Objek request dari Express.
 * @param {Response} res - Objek response dari Express.
 */
export const deleteTask = (req: Request, res: Response) => {
    const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));

    if (index === -1) {
        return sendResponse(res, 400, "Invalid task ID", null);
    }

    tasks.splice(index, 1);

    sendResponse(res, 200, "Delete task completed", null);
};
