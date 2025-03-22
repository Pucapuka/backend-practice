const sqlite3 = require('sqlite3').verbose();
const db = sqlite3.Database("./database.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE items (
            id INTEGER AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `),
    (err) => {
        if(err){
            console.error(`Erro ao criar tabela: ${err.message}`);
        }else{
            console.log('Banco de dados "items" criado ou já existente.');
        }
    }
});