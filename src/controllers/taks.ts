import { z } from 'zod';
import { Task } from '../types/task';
import { tasks } from '../db/data'
import { sendResponse, validateRequestBody } from '../lib/utils'

import type { Request, Response } from 'express';

const taskSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    completed: z.boolean()
});

export const newTask = [validateRequestBody(taskSchema), (req: Request, res: Response) => {
    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(task);
    return sendResponse<Task>(res, 201, "Success create taks", task)
}]

export const listTask = (req: Request, res: Response) => {
    sendResponse<Task[]>(res, 200, "Success", tasks)
}

export const detailTask = (req: Request, res: Response) => {
    const task = tasks.find((data) => data.id === parseInt(req.params.id));

    if (!task) {
        return sendResponse(res, 400, "Invalid taks ID", null)
    }

    sendResponse<Task>(res, 200, "Success", task)
}

const completedSchema = z.object({
    completed: z.boolean()
});

export const completedTask =  [validateRequestBody(completedSchema), (req: Request, res: Response) => {
    // Find the index of the task
    const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));

    if (index === -1) {
        return sendResponse(res, 400, "Invalid taks ID", null)
    }

    // Update task by index
    tasks[index] = { ...tasks[index], completed: req.body.completed};

    sendResponse(res, 200, "Update taks completed", tasks[index])
}]

export const deleteTask = (req: Request, res: Response) => {
    // Find the index of the task
    const index = tasks.findIndex((task) => task.id === parseInt(req.params.id));

    if (index === -1) {
        return sendResponse(res, 400, "Invalid taks ID", null)
    }

    // Splice task by index
    tasks.splice(index, 1);

    sendResponse(res, 200, "Delete taks completed", null)
}