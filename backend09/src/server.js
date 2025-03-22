const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); 
const logger = require('./middlewares/loggerMiddleware');

app.use(logger); //ativa o middleware logger

app.use(express.json());

app.use('/users', userRoutes);

const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware); 

const PORT = 3000;
app.listen(PORT, () => console.log('Servidor funcionando na porta ', PORT));

