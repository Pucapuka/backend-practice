//Esse middleware captura os erros e evita que o servidor quebre
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Ocorreu um erro interno ao servidor."});
};

module.exports = errorMiddleware;