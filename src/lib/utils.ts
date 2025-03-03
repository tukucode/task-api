import { z } from 'zod';

import type { Request, Response, NextFunction } from 'express';

/**
 * Mengirimkan response JSON dengan format yang konsisten.
 *
 * @template T - Tipe data yang akan dikirim dalam response.
 * @param {Response} res - Objek response dari Express.
 * @param {number} code - HTTP status code yang akan dikirim.
 * @param {string} message - Pesan deskriptif terkait response.
 * @param {T} data - Data utama yang akan dikirimkan dalam response.
 * @returns {void} - Tidak mengembalikan nilai, hanya mengirim response JSON.
 */
export const sendResponse = <T>(
    res: Response,
    code: number,
    message: string,
    data: T,
    errors?: {
        path: string
        message: string
    }[]
): void => {
    res.status(code).json({ code, message, data, errors });
};

/**
 * Utility function to validate request body using Zod
 * @param {z.ZodSchema} schema - Zod schema to validate the request body
 * @returns {Function} Express middleware for validation
 */
export const validateRequestBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((item) => ({
                path: item.path.join("."),
                message: item.message,
            }));

            sendResponse(res, 400, 'Error validation', null, errors)
            return;
        }

        req.body = result.data;
        next();
    };
};