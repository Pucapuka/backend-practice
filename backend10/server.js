const express = require('express');
const app = express();
const books = require('./data/books.json');
app.use(express.json());

//get all books
app.get('/books', (req,res) => {
    res.json(books);
});

//get a single book by Id
app.get('/books/:id', (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    book ? res.json(book) : res.status(400).json({message: "Not found"});
});

//post a new book
app.post('/books', (req, res) => {
    const newBook = {id: books.length + 1, ...req.body};
    books.push(newBook);
    res.status(201).json(newBook);
});

//update a book
app.put('/books/:id', (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if(book){
        Object.assign(book, req.body);
        res.json(book);
    }else{
        res.status(404).json({message:"Not found"});
    }
});

//delete a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({message: "Invalid Id"});
    }
    const index = books.findIndex((b) => b.id === id);
    if (index === -1){
        res.status(404).json({message: "not found"});
    }
    books.splice(index,1);
    res.json({message: "deleted"});
})

const PORT = 3000;

app.listen(PORT, () => console.log('Listening to PORT', PORT));