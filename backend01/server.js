const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');

//Middleware to solve static files
app.use(express.static('public'));

const sendHtmlFile = async (res, filePath) => {
    try{
        const html = await fs.readFile(filePath, 'utf-8');
        res.status(200).type('html').send(html);
    }catch(e){
        console.error('Error reading file: ', e);
        res.statys(500).send("Erro ao carregar página");
    }
};

//routes
app.get('/', async(req, res) => {
   await sendHtmlFile(res, path.join(__dirname, 'pages', 'home.html'));
});

app.get('/about', async(req, res) => {
    await sendHtmlFile(res, path.join(__dirname, 'pages', 'about.html'));
});

app.get('/contact', async(req, res) => {
    await sendHtmlFile(res, path.join(__dirname, 'pages', 'contact.html'));
});


const PORT = 3000;
app.listen(PORT, () => {console.log('listening on port ' + PORT);});