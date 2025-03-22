const express = require('express');
const router =  express.Router();

//defining a route
router.get('/users', (req,res) =>{
    res.json([{id: 1, name: "John"}, {id: 2, name: "Mary"}, {id: 3, name: "Peter"}]);
});

module.exports = router;