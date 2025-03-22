const express = require('express');
const router = express.Router();

//defining route
router.get('/products', (req, res) => {
    res.json([{id: 1, name:'apple'}, {id: 2, name:'orange'}, {id: 3, name:'pears'}]);
});

module.exports = router;