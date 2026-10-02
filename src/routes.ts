import { Router } from "express";

//Inicializa o router
const routes = Router();

type Aluno = {
  nome: string;
  idade: number;
  cpf?: string;
  media?: number;
  status?: string;
};

const alunos: Aluno[] = [
  { nome: "A", idade: 20 },
  { nome: "B", idade: 19 },
  { nome: "C", idade: 18 },
  { nome: "D", idade: 17 },
];

//Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello World!" });
});

//routes.get("/rng", (request, response) => {
//    const number = Math.floor(Math.random() * 10) + 1;
//        console.log(number);
//    return response.status(200).json(number);
//});
//
//routes.get("/fibonacci/:quantidade", (request, response) => {
//  const { quantidade } = request.params;
//
//  const numero = Number(quantidade);
//
//  let a = 0;
//  let b = 1;
//  const fibonacci: number[] = [];
//
//  for (let i = 0; i < numero; i++) {
//    fibonacci.push(a);
//
//    const proximo = a + b;
//    a = b;
//    b = proximo;
//  }
//
//  return response.status(200).json(fibonacci);
//});
//
//routes.get("/fatorial/:quantidade", (request, response) => {
//  const { quantidade } = request.params;
//
//  const numero = Number(quantidade);
//
//  let fatorial = 1;
//
//  for (let i = 1; i <= numero; i++) {
//    fatorial = fatorial * i;
//  }
//
//  return response.status(200).json(fatorial);
//});

routes.post("/aluno", (request, response) => {
  const { nome, cpf, idade, media } = request.body;

  const status = media > 6 ? "Aprovado" : "Reprovado";
  const aluno: Aluno = { nome, cpf, idade, media, status };
  alunos.push(aluno);

  return response.status(201).json(aluno);
});

routes.put("/aluno/:id", (request, response) => {
  const index = Number(request.params.id);
  const { nome } = request.body;

  if (!Number.isInteger(index) || index < 0 || index >= alunos.length) {
    return response.status(404).json({ message: "Aluno não encontrado" });
  }

  const aluno = alunos[index];
  if (!aluno) {
    return response.status(404).json({ message: "Aluno não encontrado" });
  }

  aluno.nome = nome;

  return response.status(200).json(aluno);
});

routes.delete("/aluno/:id", (request, response) => {
  const index = Number(request.params.id);

  if (!Number.isInteger(index) || index < 0 || index >= alunos.length) {
    return response.status(404).json({ message: "Aluno não encontrado" });
  }

  alunos.splice(index, 1);
  return response.status(200).json(alunos);
});

export default routes;
