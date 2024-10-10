import { Router } from "express";

const suspeitosRoutes = Router();

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
    return res.status(200).send(suspeitos);
});

suspeitosRoutes.post("/", (req, res) => {
    const { nome, idade, profissão, envolvimentoEmApostas, nivelDeSuspeita } = req.body;
    if (!nome || !profissão || !nivelDeSuspeita) {
        return res.status(400).send({ message: "Nome, profissão e nível de suspeita são obrigatórios" });
    }
    const novoSuspeito = {
        id: suspeitos.length + 1,
        nome,
        idade,
        profissão,
        envolvimentoEmApostas,
        nivelDeSuspeita
    };
    suspeitos.push(novoSuspeito);
    return res.status(201).send(novoSuspeito);
});

suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;
    const suspeito = suspeitos.find((suspeito) => suspeito.id == id);
    if (!suspeito) {
        return res.status(404).send({ message: `Suspeito com id ${id} não foi encontrado!` });
    }
    return res.status(200).json(suspeito);
});

suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, idade, profissão, envolvimentoEmApostas, nivelDeSuspeita } = req.body;

    const suspeitoIndex = suspeitos.findIndex(suspeito => suspeito.id === Number(id));

    if (suspeitoIndex < 0) {
        return res.status(404).send({ message: "Suspeito não encontrado" });
    }

    suspeitos[suspeitoIndex] = {
        id: Number(id),
        nome,
        idade,
        profissão,
        envolvimentoEmApostas,
        nivelDeSuspeita
    };

    return res.status(200).send(suspeitos[suspeitoIndex]);
});

suspeitosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;
    const suspeito = suspeitos.find((suspeito) => suspeito.id == id);

    if (!suspeito) {
        return res.status(404).send({ message: `Suspeito com id ${id} não foi encontrado!` });
    }
    suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

    return res.status(200).send({
        message: "Suspeito removido com sucesso!",
        suspeito,
    });
});

export default suspeitosRoutes;