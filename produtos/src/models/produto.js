const mongoose = require("mongoose")

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String },
    estoque: { type: Number, default: 0 }
})

module.exports = mongoose.model('Produto', ProdutoSchema)