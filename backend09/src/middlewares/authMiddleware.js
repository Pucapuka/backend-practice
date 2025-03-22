//esse middleware será requisitado no userRoutes
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({message: "Token não fornecido"});
    }

    try{
        const decoded = jwt.verify(token.split(" ")[1], "meu-segredo-super-seguro");
        req.user = decoded; //salva os dados do usuário no request
        next();
    }catch(err){
        return res.status(403).json({message:"Token inválido"});
    }
}

module.exports = authMiddleware;