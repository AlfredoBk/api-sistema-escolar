import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default {
    list: async (request: Request, response: Response) => {
        try {
            const alunos = await prisma.aluno.findMany({
                include: {
                    cursos: true,
                },
            });
            return response.status(200).json(alunos);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);

            if (!Number.isInteger(id)) {
                return response.status(400).json({ error: "ID inválido" });
            }

            const aluno = await prisma.aluno.findUnique({
                where: { id },
                include: {
                    cursos: true,
                },
            });

            return response.status(200).json(aluno);
        } catch (e) {
            return handleErrors(e, response);
        }
    },



    create: async (request: Request, response: Response) => {
        try {
            const { nome, matricula, cpf, nascimento, email, telefone, endereco } = request.body;

            if (!matricula || !cpf || !nome || !email) {
                return response.status(400).json("Dados do aluno incompletos");
            }

            const aluno = await prisma.aluno.create({
                data: {
                    nome,
                    matricula,
                    cpf,
                    nascimento: new Date(nascimento),
                    email,
                    telefone,
                    endereco
                }
            });


            return response.status(201).json(aluno);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const { nome, matricula, cpf, nascimento, email, telefone, endereco } = request.body;

            const aluno = await prisma.aluno.update({
                where: {
                    id: +id,
                },
                data: {
                    nome,
                    matricula,
                    cpf,
                    nascimento: nascimento ? new Date(nascimento) : undefined,
                    email,
                    telefone,
                    endereco
                }
            });
          return response.status(200).json(aluno);
        } catch (e) {
            return handleErrors(e, response);
        }

    }
};