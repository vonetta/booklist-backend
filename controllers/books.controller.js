"use strict";

const booksService = require("../services/books.service");

let _apiPrefix;

module.exports = apiPrefix => {
  _apiPrefix = apiPrefix;
  return {
    create: create,
    getBooks: getBooks,
    removeBook: removeBook,
    editBook: editBook
  };
};

function getBooks(req, res) {
  booksService
    .getAllBooks()
    .then(books => res.status(200).json(books))
    .catch(err => res.status(500).send(err));
}

function create(req, res) {
  booksService
    .create(req.body)
    .then(book => res.status(201).json(book))
    .catch(err => res.status(500).send(err));
}

function removeBook(req, res) {
  console.log(req.params.id, "controller");
  booksService
    .removeBook(req.params.id)
    .then(book => res.status(201).json(book))
    .catch(err => res.status(500).send(err));
}

function editBook(req, res) {
  console.log(req.body);
  booksService
    .editBook(req.body)
    .then(book => res.status(201).json(book))
    .catch(err => res.status(500).send(err));
}
