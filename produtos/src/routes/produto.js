const express = require("express");
const router = express.Router();
const Produto = require("../models/produto");

router.post("/", async (req, res) => {
    const dados = req.body;

    if (!dados.nome || !dados.preco) {
        return res.status(400).send({ mensagem: "Nome e preco são obrigatórios" });
    }

    try {
        const novoProduto = new Produto(dados);
        const produtoSalvo = await novoProduto.save();
        res.status(201).send(produtoSalvo);
    } catch (err) {
        console.error("Erro ao criar produto:", err);
        res.status(500).send({ mensagem: "Erro ao criar produto" });
    }
});

router.get("/", async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).send(produtos);
    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        res.status(500).send({ mensagem: "Erro ao buscar produtos" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).send({ mensagem: "Produto não encontrado" });
        }
        res.status(200).send(produto);
    } catch (err) {
        console.error("Erro ao buscar produto:", err);
        res.status(500).send({ mensagem: "Erro ao buscar produto" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    if (!dadosAtualizados.nome || !dadosAtualizados.preco) {
        return res.status(400).send({ mensagem: "Nome e preco são obrigatórios" });
    }

    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, dadosAtualizados, { new: true });
        if (!produtoAtualizado) {
            return res.status(404).send({ mensagem: "Produto não encontrado" });
        }
        res.status(200).send(produtoAtualizado);
    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        res.status(500).send({ mensagem: "Erro ao atualizar produto" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExcluido = await Produto.findByIdAndDelete(id);
        if (!produtoExcluido) {
            return res.status(404).send({ mensagem: "Produto não encontrado" });
        }
        res.status(200).send({ mensagem: "Produto deletado com sucesso" });
    } catch (err) {
        console.error("Erro ao deletar produto:", err);
        res.status(500).send({ mensagem: "Erro ao deletar produto" });
    }
});

module.exports = router;
