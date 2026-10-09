import { Router } from "express";
import alunoController from "./controllers/aluno";
import cursoController from "./controllers/curso";
import matriculaController from "./controllers/matricula";
import funcionarioController from "./controllers/funcionario"; 
import { authentication } from "./middlewares/authentication";
import { isAdministrator, permissions } from "./middlewares/permissions";

// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World!" });
});

// Rotas de alunos
routes.get("/alunos", authentication, alunoController.list);
routes.get("/alunos/:id", authentication, alunoController.getById);
routes.post("/alunos", authentication, alunoController.create);
routes.put("/alunos/:id", authentication, alunoController.update);
routes.delete("/alunos/:id", authentication, alunoController.delete);

// Rotas de cursos
routes.get("/cursos", authentication, cursoController.list);
routes.get("/cursos/:id", authentication, cursoController.getById);
routes.post("/cursos", authentication, cursoController.create);
routes.put("/cursos/:id", authentication, cursoController.update);
routes.delete("/cursos/:id", authentication, cursoController.delete);

// Rota para matricular alunos em cursos
routes.post("/matriculas/:id", authentication, matriculaController.create);
routes.delete("/matriculas/:id", authentication, matriculaController.delete);

// Rotas dos funcionários
routes.get("/funcionarios", authentication, permissions, funcionarioController.list);
routes.get("/funcionarios/:id", authentication, isAdministrator, funcionarioController.getById);
routes.post("/funcionarios", authentication, permissions, funcionarioController.create);
routes.put("/funcionarios/:id", authentication, isAdministrator, funcionarioController.update);
routes.delete("/funcionarios/:id", authentication, isAdministrator, funcionarioController.delete);

routes.post("/login", funcionarioController.login);

export default routes;