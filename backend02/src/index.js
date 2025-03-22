const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    const { url, method } = req;
    if(method === 'GET' && url === '/') {
        try{
            const data = await fs.readFile('./pages/home.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }catch(e){
            console.log(e);
            res.writeHead(500, e);
            res.end('<h2>Erro ao carregar página</h2>');
        }
    }else if(method === 'GET' && url === '/about'){
        try{
            const data = await fs.readFile('./pages/about.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }catch(e){
            console.log(e);
            res.writeHead(500, e);
            res.end('<h2>Erro ao carregar página</h2>');
        }
    }else if(method === 'GET' && url === '/contact'){
        try{
            const data = await fs.readFile('./pages/contact.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }catch(e){
            console.log(e);
            res.writeHead(500, e);
            res.end('<h2>Erro ao carregar página</h2>');
        }
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});