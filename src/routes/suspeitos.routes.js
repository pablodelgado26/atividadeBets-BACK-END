import { Router } from "express"

const suspeitosRoutes = Router()

let suspeitos = [
    {
        id: 1,
        nome: "José",
        idade: 45,
        profissão: "Médico",
        envolvimentoEmApostas: false,
        nivelDeSuspeita: "Alto"
    },
    {
        id: 2,
        nome: "Maria",
        idade: 30,
        profissão: "Enfermeira",
        envolvimentoEmApostas: true,
        nivelDeSuspeita: "Médio"
    },
    {
        id: 3,
        nome: "João",
        idade: 25,
        profissão: "Motorista",
        envolvimentoEmApostas: false,
        nivelDeSuspeita: "Baixo"
    }
];

suspeitosRoutes.get("/", (req, res) => {
    return res.status(200)
    .send(suspeitos);
});

suspeitosRoutes.post("/", (req, res) => {
    const { nome, idade, profissão, envolvimentoEmApostas, nivelDeSuspeita } = req.body;
    if(!nome || !profissão || !nivelDeSuspeita) {
        return res.status(400)
        .send({ message: "Nome, profissão e nível de suspeita são obrigatórios" });
    }
})

suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;
    const suspeito = suspeitos.find(suspeito => suspeito.id === Number(id));

    if (!suspeito) {
        return res.status(404)
        .send({ message: "Suspeito não encontrado" });
    }

    return res.status(200)
    .send(suspeito);
});







export default suspeitosRoutes;