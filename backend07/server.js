const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const db = require('./database/database');

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

// Rota GET /products
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            return res.status(500).send({ error: 'Erro ao buscar produtos.' });
        }
        res.send(rows);
    });
});

// Rota POST /products
app.post('/products', (req, res) => {
    const newProduct = req.body;

    if (!newProduct || !newProduct.name) {
        return res.status(400).send({ error: "Produto inválido. O produto deve ter uma propriedade 'name'." });
    }

    db.run('INSERT INTO products (name) VALUES (?)', [newProduct.name], function (err) {
        if (err) {
            return res.status(500).send({ error: 'Erro ao adicionar produto.' });
        }
        const insertedProduct = { id: this.lastID, name: newProduct.name };
        res.status(201).send(insertedProduct);
    });
});

// Rota PUT /products/:id
app.put('/products/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedProduct = req.body;

    if (idToUpdate <= 0 || isNaN(idToUpdate)) {
        return res.status(400).send({ error: 'O id deve ser um número maior que zero.' });
    }

    if (!updatedProduct || !updatedProduct.name) {
        return res.status(400).send({ error: 'O produto deve ter uma propriedade "name".' });
    }

    db.run('UPDATE products SET name = ? WHERE id = ?', [updatedProduct.name, idToUpdate], function (err) {
        if (err) {
            return res.status(500).send({ error: 'Erro ao atualizar produto.' });
        }

        if (this.changes === 0) {
            return res.status(404).send({ error: 'Produto não encontrado.' });
        }

        res.status(200).send({ id: idToUpdate, name: updatedProduct.name });
    });
});

// Rota DELETE /products/:id
app.delete('/products/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);

    if (isNaN(idToDelete) || idToDelete <= 0) {
        return res.status(400).send({ error: 'O id deve ser um número maior que zero.' });
    }

    db.run('DELETE FROM products WHERE id = ?', [idToDelete], function (err) {
        if (err) {
            return res.status(500).send({ error: 'Erro ao deletar produto.' });
        }

        if (this.changes === 0) {
            return res.status(404).send({ error: 'Produto não encontrado.' });
        }

        res.status(200).send({ message: `Item com id ${idToDelete} deletado com sucesso.` });
    });
});

app.listen(PORT, () => console.log(`Servidor rodando em https://localhost:${PORT}`));

module.exports = PORT;