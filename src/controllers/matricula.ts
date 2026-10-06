import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { handleErrors } from '../helpers/handleErrors';

export default {
    create: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { cursosIds } = request.body;

            if (!cursosIds || !Array.isArray(cursosIds)) {
                return response.status(400).json("Cursos inválidos");
            }
        } catch (e) {
            return handleErrors(e, response);
        
        }
    }
}