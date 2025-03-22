const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');

const app = express();

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', rawMaterialRoutes);
app.get('/', (req, res) => {
    res.send('server working');
})

//Middlewares
app.use(express.json()); //parse JSON data
//CUSTON Middleware to log requests
app.use((req, res, next) => {
    console.log(`Method: ${req.method} | Endpoint: ${req.url}`)
    next();
});

//middleware
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if(!apiKey){
        return res.status(401).json({message: 'Unauthorized: x-api-key is missing'});
    }
    next();
}

//using it
app.use((req, res, next) => {
    if (!apiKey) {
        return res.status(401).json({ message: 'Unauthorized: x-api-key header is missing' });
      }
    
      next();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})