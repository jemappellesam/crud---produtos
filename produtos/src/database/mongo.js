const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado ao MongoDB Atlas")
    }catch(err){
        console.log("Erro ao conectar no banco.", err)
        process.exit(1) // encerra a aplicação com erro
    }
}

module.exports = connectDB