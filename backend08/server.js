const express  = require('express');
const db = require('./database')
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
        if(err){
            return res.status(500).send({error: 'Erro ao buscar itens.'});
        }
        res.send(rows);
    });
});

app.post('/items', (req, res) => {
    const newItem = req.body;

    if(!newItem || !newItem.name){
        return res.status(400).send({error: "Item inválido. O item deve ter uma propriedade 'name'"});
    }

    db.run('INSERT INTO items (name) VALUES (?)', [newItem.name], (err) =>{
        if(err){
            return res.status(500).send({error: 'Erro ao adicionar item.'});
        }
        const insertedItem = {id: this.lastID, name: newItem.name};
        res.status(201).send(insertedItem);
    });
});

app.put('/items/:id', (req,res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedItem = req.body;

    if(isNaN(idToUpdate)){
        return res.status(400).send({error: "Id inválido. O id deve ser um número. "});
    }
    
    if(!updatedItem || !updatedItem.name){
        return res.status(400).send({error: "Dados inválidos. O item dever ter uma propriedade 'name'. "});
    }

   db.run('UPDATE items SET name = ? WHERE id = ?', [updatedItem.name, idToUpdate], (err) => {
        if(err){
            return res.status(500).send({error: 'Erro ao atualizar item.'});
        }

        if(this.changes === 0){
            return res.status(404).send({error: 'Item não encontrado.'});
        }

        res.status(200).send({id: idToUpdate, name: updatedItem});
   });
});

app.delete('/items/:id', (req,res) => {
    const idToDelete = parseInt(req.params.id);
    if(isNaN(idToDelete)){
        return res.status(400).send({error: "Id inválido. O id deve ser um número."});
    }

    db.run('DELETE FROM items WHERE id = ?', [idToDelete], (err) => {
        if(err){
            return res.status(500).send({error: 'Erro ao deletar item.'});
        }

        if(this.changes === 0){
            return res.status(400).send({error: 'Item não encontrado.'});
        }

        res.status(200).send({message: `Item com id ${idToDelete} deletado com sucesso.`});
    });
   
});

const PORT = 3000;

app.listen(PORT, () => console.log("Servidor rodando na porta ", PORT))