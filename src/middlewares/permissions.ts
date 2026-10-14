import { Request, Response, NextFunction } from "express";

export function isAdministrator(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    if (request.body.user.cargo === "Administrador") {
        next();
    } else {
        return response.status(403).json("Acesso negado");
    }
}

export function permissions(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    if (
        request.body.user.cargo === "Administrador" ||
        String(request.body.user.id) === request.params.id
    ) {
        next();
    } else {
        return response.status(403).json("Acesso negado");
    }
}
