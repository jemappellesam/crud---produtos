const axios = require("axios")

const auth = async (req, res, next) => {
    // obter o token
    const {authorization} = req.headers

    
    try{
        const token = authorization.replace("Bearer ", "")
        // verificar validade do token
        const response = await axios.post("http://localhost:8081/validarToken", {
            token
        })
        
        // avançar ou parar
        if(response.data.sucesso){
            return next()
        }else{
            return res.status(401).send("Token inválido.")
        }
    }catch(err){
        return res.status(401).send("Token inválido.")
    }
    
}

module.exports = auth