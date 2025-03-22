const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');  



app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}/`);
});