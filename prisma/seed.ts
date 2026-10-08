import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

async function main() {
    const funcionario = await prisma.funcionario.create({
        data: {
            nome: "Admin",
            email: "admin@gmail.com",
            cargo: "Administrador",
            cpf: "12345678900",
            senha: bcrypt.hashSync("admin123", +process.env.BCRYPT_ROUNDS!),
        },
    });

    console.log("Funcionário criado:", funcionario);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });