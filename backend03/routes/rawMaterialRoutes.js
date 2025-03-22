const express = require('express');
const router = express.Router();

router.get('/rawMaterials', (req, res) => {
    res.send([{id: 1, name:"Plastic"}, {id: 2, name:"Powder"}, {id: 3, name:"Cream"}])
});

module.exports = router;