import { request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
    request: Request,
    response: Response,
    next: NextFunction,

) {
    try {
        

    } catch (e) {
        console.error(e);  
        return response.status(401).json("Não autenticado"); 
    }   
}