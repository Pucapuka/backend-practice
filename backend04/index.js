const http = require('http');
const fs = require('fs').promises;

//setting a route for not commit the classic mistake DRY
const routes = {
    '/': './pages/home.html',
    '/contact': './pages/contact.html',
    '/about': './pages/about.html',
};

const server = http.createServer(async (req, res) => {
    const {method, url} = req;
    //routes
    if(method === 'GET' && routes[url]){
        try{
            const data = await fs.readFile(routes[url]);
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }catch(e){
            console.error("Erro ao ler o arquivo", e);
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Erro interno do servidor.');
        }
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end("Página não encontrada.");
    }
})

const PORT = 3000;

server.listen(PORT, () => console.log('listening on port', PORT));