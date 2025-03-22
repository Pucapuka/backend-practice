const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');
const PORT = 3000;

const routes = {
    '/': path.join(__dirname, 'pages', 'homepage.html'),
    '/about': path.join(__dirname, 'pages', 'about.html'),
    '/contact': path.join(__dirname, 'pages', 'contact.html'),
};

app.get(Object.keys(routes), async (req, res) => {
    try {
        const filePath = routes[req.path]; // No need for await here

        // Check if the file exists
        try {
            await fs.access(filePath);
        } catch (e) {
            return res.status(404).send('Página não encontrada'); // Return early to stop execution
        }

        // Read the file
        const data = await fs.readFile(filePath, 'utf8');
        res.status(200).send(data);
    } catch (e) {
        console.error("Erro interno:", e); // Log the error for debugging
        res.status(500).send("Erro interno");
    }
});

app.listen(PORT, () => console.log('Servidor rodando na porta ', PORT));