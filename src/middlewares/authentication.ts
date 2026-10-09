import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authentication(
    request: Request,
    response: Response,
    next: NextFunction,

) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json("Não autenticado");
        }

        const [bearer, token] = authHeader.split(" ");

        if (bearer !== "Bearer" || !token) {
            return response.status(401).json("Não autenticado");
        }

        const secret = process.env.JWT_SECRET ?? "sistema-escolar-dev-secret";
        const decoded = jwt.verify(token, secret);

        if (
            typeof decoded !== "object" ||
            decoded === null ||
            !Number.isInteger(decoded.id) ||
            typeof decoded.cargo !== "string"
        ) {
            return response.status(401).json("Não autenticado");
        }

        if (!request.body) {
            request.body = {};
        }

        request.body.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        return response.status(401).json("Não autenticado");
    }
}