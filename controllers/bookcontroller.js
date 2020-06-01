var express = require('express')
var router = express.Router();
var sequelize = require("../db");
var BookModel = sequelize.import("../models/book")
var validateSession = require('../middleware/validate-session')

//Post New Book
router.post('/new-review', validateSession, (req, res) => {
    let title = req.body.book.title;
    let author = req.body.book.author;
    let genre = req.body.book.genre; //should this be a drop down with options?
    let length = req.body.book.length; //want to add a "total pages read" "total books read" output for user's profile
    let review = req.body.book.review; //want to add a star rating or "recommended" boolean (YES/NO)
    let owner = req.user.id;
BookModel
    .create({
        title: title,
        author: author,
        genre: genre,
        length: length,
        review: review,
        owner: owner
    })
    .then (databaseData => {
        res.json({
            data: databaseData,
        });  
    });
});

//Get All Books 
router.get('/all-books', validateSession, (req, res) => { //THIS WORKS
    BookModel.findAll()
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json(err));
});


//Get Current User's Books
router.get('/my-books', validateSession, (req, res) => { //THIS WORKS
    BookModel.findAll({ where: {owner: req.user.id }})
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json(err));
});

//Get One Book
router.get('/:id', validateSession, (req, res) => { //THIS WORKS, BUT CAN BE EDITTED REGARDLESS BY ANYONE
    BookModel.findOne({ where: { id: req.params.id }})
    .then(book => res.status(200).json(book))
    .catch(err => res.status(500).json(err));
});

//Edit Book Info 
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors) {
        BookModel.update(req.body.book, { where: {owner: req.user.id, id: req.params.id}})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
});

//Delete Book Entirely
router.delete('/:id', validateSession, (req, res) => {
    if (!req.errors){
        BookModel.destroy({where: { owner: req.user.id, id: req.params.id }})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})


module.exports = router;