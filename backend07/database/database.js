const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `)
    ,
    (err) => {
        if(err){
            console.error('Erro ao criar tabela.');
        }else{
            console.log(`Tabela "products" criada ou já existente.`);
        }
    }
});

module.exports = db;