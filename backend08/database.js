const sqlite3 = require('sqlite3').verbose(); //verbose vai dizer no log o que está sendo feito por 'debaixo dos panos'. Para depuração é ótimo, mas para produção, pode tirar.

//conecta ao banco de dados (ou cria se não existir)
const db = new sqlite3.Database('./database.db');

//cria a tabela de itens (se não existir)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`)
    ,
    (err) => {
        if(err){
            console.error('Erro ao criar tabela: ', err.message);
        }else{
            console.log('Tabela "items" criada ou já existente.');
        }
    }
});

module.exports = db;